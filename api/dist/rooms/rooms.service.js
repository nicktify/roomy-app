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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
let RoomsService = class RoomsService {
    constructor(roomModel, userModel) {
        this.roomModel = roomModel;
        this.userModel = userModel;
    }
    async getRooms() {
        const rooms = await this.roomModel.find();
        return rooms.map(room => ({
            id: room._id,
            name: room.name,
            owners: room.owners,
            participants: room.participants,
            links: room.links,
            dates: room.dates,
            posts: room.posts,
            books: room.books,
        }));
    }
    async getRoom(id) {
        if (!id)
            return { msg: 'Id should not be empty.' };
        try {
            const findedRoom = await this.roomModel.findById(id);
            if (!findedRoom)
                return { msg: 'Room not exist.' };
            return {
                id: findedRoom._id,
                name: findedRoom.name,
                owners: findedRoom.owners,
                participants: findedRoom.participants,
                links: findedRoom.links,
                dates: findedRoom.dates,
                posts: findedRoom.posts,
                books: findedRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async createRoom({ name, password, owner }, authenticatedUser) {
        try {
            const findOwner = await this.userModel.findById(owner);
            if (!findOwner)
                return { msg: 'User not exist.' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            const createdRoom = await this.roomModel.create({ name, password, owners: owner });
            findOwner.ownedRooms.push(createdRoom._id);
            findOwner.save();
            return {
                id: createdRoom._id,
                name: createdRoom.name,
                owners: createdRoom.owners,
                participants: createdRoom.participants,
                links: createdRoom.links,
                dates: createdRoom.dates,
                posts: createdRoom.posts,
                books: createdRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async editRoom({ id, name, owner }, authenticatedUser) {
        try {
            const room = await this.roomModel.findById(id);
            if (!room)
                return { msg: 'Room not exist.' };
            const user = await this.userModel.findById(owner);
            if (!user)
                return { msg: 'User not exist.' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            await this.roomModel.updateOne({ _id: id }, { name });
            const editedRoom = await this.roomModel.findById(id);
            return {
                id: editedRoom._id,
                name: editedRoom.name,
                owners: editedRoom.owners,
                participants: editedRoom.participants,
                links: editedRoom.links,
                dates: editedRoom.dates,
                posts: editedRoom.posts,
                books: editedRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRoom(id, owner, authenticatedUser) {
        try {
            const user = await this.userModel.findById(owner);
            if (!user)
                return { msg: 'User not exist.' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            const roomToDelete = await this.roomModel.findById(id);
            for (let i = 0; i < roomToDelete.owners.length; i++) {
                const owner = await this.userModel.findById(roomToDelete.owners[i]);
                if (owner) {
                    owner.ownedRooms = owner.ownedRooms.filter(room => room != id);
                    owner.save();
                }
            }
            for (let i = 0; i < roomToDelete.participants.length; i++) {
                const participant = await this.userModel.findById(roomToDelete.participants[i]);
                if (participant) {
                    participant.participantRooms = participant.participantRooms.filter(room => room !== id);
                    participant.save();
                }
            }
            await this.roomModel.deleteOne({ _id: id });
            return { msg: 'Room has been deleted.' };
        }
        catch (error) {
            throw error;
        }
    }
    async addNewOwner({ id, owner, newOwner }, authenticatedUser) {
        try {
            const findedRoom = await this.roomModel.findById(id);
            if (!findedRoom)
                return { msg: 'The room not exists.' };
            const findNewUser = await this.userModel.findById(newOwner);
            if (!findNewUser)
                return { msg: 'New user not exists.' };
            const findOwner = await this.userModel.findById(owner);
            if (!findOwner)
                return { msg: 'Owner user not exist' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            if (!findedRoom.owners.includes(owner))
                return { msg: 'You are not the owner of this room.' };
            if (findedRoom.owners.includes(newOwner))
                return { msg: 'Given user is already an owner of this room.' };
            findedRoom.owners.push(newOwner);
            findedRoom.save();
            if (!findNewUser.ownedRooms.includes(id)) {
                findNewUser.ownedRooms.push(id);
                findNewUser.save();
            }
            return {
                id: findedRoom._id,
                name: findedRoom.name,
                owners: findedRoom.owners,
                participants: findedRoom.participants,
                links: findedRoom.links,
                dates: findedRoom.dates,
                posts: findedRoom.posts,
                books: findedRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOwner({ id, owner, ownerToDelete }, authenticatedUser) {
        try {
            const findedRoom = await this.roomModel.findById(id);
            if (!findedRoom)
                return { msg: 'Room not exist.' };
            const findOwner = await this.userModel.findById(owner);
            if (!findOwner)
                return { msg: 'Owner not exist.' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            const findOwnerToDelete = await this.userModel.findById(ownerToDelete);
            if (!findOwnerToDelete)
                return { msg: 'Owner to delete not exist' };
            if (!findedRoom.owners.includes(owner))
                return { msg: 'You are not the owner of this room.' };
            if (!findedRoom.owners.includes(ownerToDelete))
                return { msg: 'Given user is not an owner of this room.' };
            const filteredOwners = findedRoom.owners.filter(owner => owner !== ownerToDelete);
            findedRoom.owners = filteredOwners;
            findedRoom.save();
            if (findOwnerToDelete.ownedRooms.includes(id)) {
                const filteredRooms = findOwnerToDelete.ownedRooms.filter(room => room !== id);
                findOwnerToDelete.ownedRooms = filteredRooms;
                findOwnerToDelete.save();
            }
            return {
                id: findedRoom._id,
                name: findedRoom.name,
                owners: findedRoom.owners,
                participants: findedRoom.participants,
                links: findedRoom.links,
                dates: findedRoom.dates,
                posts: findedRoom.posts,
                books: findedRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async addNewParticipant({ id, owner, newParticipant }, authenticatedUser) {
        try {
            const findedRoom = await this.roomModel.findById(id);
            if (!findedRoom)
                return { msg: 'Room not exist.' };
            const findOwner = await this.userModel.findById(owner);
            if (!findOwner)
                return { msg: 'Owner not exists.' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            const findNewParticipant = await this.userModel.findById(newParticipant);
            if (!findNewParticipant)
                return { msg: 'New participant not exist.' };
            if (!findedRoom.owners.includes(owner))
                return { msg: 'You are not the owner of this room' };
            if (findedRoom.participants.includes(newParticipant))
                return { msg: 'The user is already a participant of this room.' };
            findedRoom.participants.push(newParticipant);
            findedRoom.save();
            if (!findNewParticipant.participantRooms.includes(id)) {
                findNewParticipant.participantRooms.push(id);
                findNewParticipant.save();
            }
            ;
            return {
                id: findedRoom._id,
                name: findedRoom.name,
                owners: findedRoom.owners,
                participants: findedRoom.participants,
                links: findedRoom.links,
                dates: findedRoom.dates,
                posts: findedRoom.posts,
                books: findedRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteParticipant({ id, owner, participantToDelete }, authenticatedUser) {
        try {
            const findedRoom = await this.roomModel.findById(id);
            if (!findedRoom)
                return { msg: 'The room not exists.' };
            const findParticipant = await this.userModel.findById(participantToDelete);
            if (!findParticipant)
                return { msg: 'Participant to delete not exists.' };
            const findOwner = await this.userModel.findById(owner);
            if (!findOwner)
                return { msg: 'Owner user not exist' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            if (!findedRoom.owners.includes(owner))
                return { msg: 'You are not the owner of this room.' };
            if (!findedRoom.participants.includes(participantToDelete))
                return { msg: 'Given user is not a participant of this room.' };
            const filteredParticipants = findedRoom.participants.filter(participant => participant !== participantToDelete);
            findedRoom.participants = filteredParticipants;
            findedRoom.save();
            if (findParticipant.participantRooms.includes(id)) {
                const filteredRooms = findParticipant.participantRooms.filter(room => room !== id);
                findParticipant.participantRooms = filteredRooms;
                findParticipant.save();
            }
            return {
                id: findedRoom._id,
                name: findedRoom.name,
                owners: findedRoom.owners,
                participants: findedRoom.participants,
                links: findedRoom.links,
                dates: findedRoom.dates,
                posts: findedRoom.posts,
                books: findedRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async addNewBook({ id, ownerId, name, description, link }, authenticatedUser) {
        try {
            const room = await this.roomModel.findById(id);
            if (!room)
                return { msg: 'Room not exist.' };
            const owner = await this.userModel.findById(ownerId);
            if (!owner)
                return { msg: 'Owner user not exist.' };
            if (ownerId !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            if (!room.owners.includes(ownerId))
                return { msg: 'You are not the owner of this room.' };
            const book = { ownerId, name, description, link };
            await room.books.push(book);
            room.save();
            return { msg: 'Book added successfully' };
        }
        catch (error) {
            throw error;
        }
    }
    async addNewLink({ id, ownerId, name, link }, authenticatedUser) {
        try {
            const room = await this.roomModel.findById(id);
            if (!room)
                return { msg: 'Room not exist.' };
            const owner = await this.userModel.findById(ownerId);
            if (!owner)
                return { msg: 'Owner user not exist.' };
            if (ownerId !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            if (!room.owners.includes(ownerId))
                return { msg: 'You are not the owner of this room.' };
            const newLink = { name, link };
            room.links.push(newLink);
            room.save();
            return { msg: 'Link added successfully.' };
        }
        catch (error) {
            throw error;
        }
    }
};
RoomsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Room')), __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map