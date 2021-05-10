"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUsers() {
        const users = await this.userModel.find();
        return users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            ownedRooms: user.ownedRooms,
            participantRooms: user.participantRooms,
            profilePicture: user.profilePicture,
        }));
    }
    async getUser(id) {
        if (!id)
            return { msg: 'Id is mandatory.' };
        const findedUser = await this.userModel.findById(id);
        if (!findedUser)
            return { msg: 'User not exists.' };
        return {
            id: findedUser._id,
            name: findedUser.name,
            email: findedUser.email,
            role: findedUser.role,
            ownedRooms: findedUser.ownedRooms,
            participantRooms: findedUser.participantRooms,
            profilePicture: findedUser.profilePicture,
        };
    }
    async createUser({ name, email, password, role }, file) {
        try {
            const user = await this.userModel.findOne({ email: email });
            if (user)
                return { msg: 'User already exist.' };
            const rounds = 10;
            const hash = await bcrypt.hash(password, rounds);
            const createdUser = await this.userModel.create({ name, email, password: hash, role });
            console.log(createdUser.profilePicture);
            const newUser = {
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                role: createdUser.role,
                ownedRooms: createdUser.ownedRooms,
                participantRooms: createdUser.participantRooms,
                profilePicture: createdUser.profilePicture,
            };
            if (!file)
                return newUser;
            return new Promise((resolve, reject) => {
                let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" }, function (error, result) {
                    if (error)
                        reject(error);
                    createdUser.profilePicture = result.secure_url;
                    createdUser.save();
                    const curatedUser = {
                        id: createdUser._id,
                        name: createdUser.name,
                        email: createdUser.email,
                        role: createdUser.role,
                        ownedRooms: createdUser.ownedRooms,
                        participantRooms: createdUser.participantRooms,
                        profilePicture: createdUser.profilePicture,
                    };
                    resolve(curatedUser);
                });
                streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword({ newPassword, oldPassword, userId }, user) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                return { msg: 'User not exist.' };
            const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
            if (!isCorrectPassword)
                return { msg: 'Authentication failed.' };
            const rounds = 10;
            const newHashedPassword = await bcrypt.hash(newPassword, rounds);
            user.password = newHashedPassword;
            user.save();
            return { msg: 'Password changed.' };
        }
        catch (error) {
            throw error;
        }
    }
    async addProfilePicture({ userId }, file, authenticatedUser) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                return { msg: 'User not exist.' };
            if (userId !== authenticatedUser.userId)
                return { msg: 'You don\'t have the rights to do this action.' };
            if (!file)
                return { msg: 'Image is required.' };
            return new Promise((resolve, reject) => {
                let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" }, function (error, result) {
                    if (error)
                        reject({ msg: 'Error uploading image.' });
                    user.profilePicture = result.secure_url;
                    user.save();
                    const curatedUser = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        ownedRooms: user.ownedRooms,
                        participantRooms: user.participantRooms,
                        profilePicture: user.profilePicture,
                    };
                    resolve(curatedUser);
                });
                streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async editUser({ id, name, email, role }, authenticatedUser) {
        try {
            const user = await this.userModel.findById(id);
            if (!user)
                return { msg: 'User not exist.' };
            if (id !== authenticatedUser.userId)
                return { msg: 'You don\'t have the rights to do this action.' };
            await this.userModel.updateOne({ _id: id }, { name, email, role });
            const editedUser = await this.userModel.findById(id);
            return {
                id: editedUser._id,
                name: editedUser.name,
                email: editedUser.email,
                role: editedUser.role,
                ownedRooms: editedUser.ownedRooms,
                participantRooms: editedUser.participantRooms,
                profilePicture: editedUser.profilePicture,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(id, authenticatedUser) {
        try {
            if (id !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            await this.userModel.deleteOne({ _id: id });
            return { msg: 'User deleted.' };
        }
        catch (error) {
            throw error;
        }
    }
    async getByEmail(email) {
        try {
            const user = await this.userModel.findOne(email);
            if (!user)
                return { msg: 'User not exist.' };
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                ownedRooms: user.ownedRooms,
                participantRooms: user.participantRooms,
                profilePicture: user.profilePicture,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async validateUser(user) {
        try {
            const findById = await this.userModel.findById(user.userId);
            if (!findById)
                return { msg: 'Invalid user', validToken: false };
            const findByEmail = await this.userModel.findOne({ email: user.email });
            if (!findByEmail)
                return { msg: 'Invalid user', validToken: false };
            return { msg: 'Token authenticated', validToken: true, user: findById };
        }
        catch (error) {
            throw error;
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map