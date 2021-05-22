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
const return_user_dto_1 = require("../users/dto/return-user.dto");
const post_schema_1 = require("../posts/schemas/post.schema");
const return_post_dto_1 = require("../posts/dto/return-post-dto");
const forum_post_schema_1 = require("../forum/schemas/forum-post.schema");
const return_forum_post_dto_1 = require("../forum/dto/return-forum-post.dto");
let RoomsService = class RoomsService {
    constructor(roomModel, userModel, postModel, forumPostModel) {
        this.roomModel = roomModel;
        this.userModel = userModel;
        this.postModel = postModel;
        this.forumPostModel = forumPostModel;
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
                books: findedRoom.books,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async createRoom({ name, owner }, authenticatedUser) {
        try {
            const findOwner = await this.userModel.findById(owner);
            if (!findOwner)
                return { msg: 'User not exist.' };
            if (owner !== authenticatedUser.userId)
                return { msg: 'You don\'t have the authorization to do this action.' };
            const createdRoom = await this.roomModel.create({ name, owners: owner });
            findOwner.ownedRooms.push(createdRoom._id);
            findOwner.save();
            return {
                id: createdRoom._id,
                name: createdRoom.name,
                owners: createdRoom.owners,
                participants: createdRoom.participants,
                links: createdRoom.links,
                dates: createdRoom.dates,
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
    async getAllUsersFromRoom(roomId) {
        try {
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Room not exist.' };
            const users = [];
            for (let i = 0; i < room.owners.length; i++) {
                const user = await this.userModel.findById(room.owners[i]);
                if (user) {
                    users.push({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        about: user.about,
                        ownedRooms: user.ownedRooms,
                        participantRooms: user.participantRooms,
                        profilePicture: user.profilePicture,
                        profileBackground: user.profileBackground,
                        socialMediaLinks: user.socialMediaLinks,
                    });
                }
            }
            for (let i = 0; i < room.participants.length; i++) {
                const user = await this.userModel.findById(room.participants[i]);
                if (user) {
                    users.push({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        about: user.about,
                        ownedRooms: user.ownedRooms,
                        participantRooms: user.participantRooms,
                        profilePicture: user.profilePicture,
                        profileBackground: user.profileBackground,
                        socialMediaLinks: user.socialMediaLinks,
                    });
                }
            }
            users.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase())
                    return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return -1;
                return 0;
            });
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUserFromRoom({ roomId, userId }) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                return { msg: 'User not exist.' };
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Room not exist.' };
            room.owners = room.owners.filter(owner => owner !== userId);
            room.participants = room.participants.filter(participant => participant !== userId);
            room.save();
            return { msg: 'User deleted from room.' };
        }
        catch (error) {
            throw error;
        }
    }
    async makeUserOwner({ userId, roomId }) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                return { msg: 'User not exist.' };
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Room not exist' };
            if (!room.owners.includes(userId)) {
                room.owners.push(userId);
            }
            room.participants = room.participants.filter(participant => participant !== userId);
            room.save();
            if (!user.ownedRooms.includes(roomId)) {
                user.ownedRooms.push(roomId);
            }
            user.participantRooms = user.participantRooms.filter(room => room !== roomId);
            user.save();
            return { msg: 'User now is owner of the room' };
        }
        catch (error) {
            throw error;
        }
    }
    async makeUserParticipant({ userId, roomId }) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                return { msg: 'User not exist.' };
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Room not exist' };
            if (!room.participants.includes(userId)) {
                room.participants.push(userId);
            }
            room.owners = room.owners.filter(owner => owner !== userId);
            room.save();
            if (!user.participantRooms.includes(roomId)) {
                user.participantRooms.push(roomId);
            }
            user.ownedRooms = user.ownedRooms.filter(room => room !== roomId);
            user.save();
            return { msg: 'User now is participant of the room.' };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllRoomsFromUser({ userId }) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user)
                return { msg: 'User not exist.' };
            let rooms = [];
            for (let i = 0; i < user.ownedRooms.length; i++) {
                const room = await this.roomModel.findById(user.ownedRooms[i]);
                if (room) {
                    rooms.push({
                        id: room._id,
                        name: room.name,
                        owners: room.owners,
                        participants: room.participants,
                        links: room.links,
                        dates: room.dates,
                        books: room.books,
                    });
                }
            }
            for (let i = 0; i < user.participantRooms.length; i++) {
                const room = await this.roomModel.findById(user.participantRooms[i]);
                if (room) {
                    rooms.push({
                        id: room._id,
                        name: room.name,
                        owners: room.owners,
                        participants: room.participants,
                        links: room.links,
                        dates: room.dates,
                        books: room.books,
                    });
                }
            }
            rooms.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase())
                    return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return -1;
                return 0;
            });
            return rooms;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllRoomInformation({ roomId }) {
        try {
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Room not exist.' };
            const posts = await this.postModel.find({ roomId });
            let returnedPosts = [];
            if (posts) {
                for (let i = 0; i < posts.length; i++) {
                    returnedPosts.push({
                        id: posts[i]._id,
                        authorId: posts[i].authorId,
                        roomId: posts[i].roomId,
                        authorProfilePicture: posts[i].authorProfilePicture,
                        authorName: posts[i].authorName,
                        body: posts[i].body,
                        date: posts[i].date,
                        image: posts[i].image,
                    });
                }
            }
            let users = [];
            for (let i = 0; i < room.participants.length; i++) {
                const user = await this.userModel.findById(room.participants[i]);
                if (user) {
                    users.push({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        about: user.about,
                        ownedRooms: user.ownedRooms,
                        participantRooms: user.participantRooms,
                        profilePicture: user.profilePicture,
                        profileBackground: user.profileBackground,
                        socialMediaLinks: user.socialMediaLinks,
                    });
                }
            }
            let forumPosts = await this.forumPostModel.find({ roomId });
            let returnedForumPosts = [];
            if (forumPosts) {
                for (let i = 0; i < forumPosts.length; i++) {
                    returnedForumPosts.push({
                        id: forumPosts[i]._id,
                        roomId: forumPosts[i].roomId,
                        authorId: forumPosts[i].authorId,
                        authorName: forumPosts[i].authorName,
                        authorProfilePicture: forumPosts[i].authorProfilePicture,
                        body: forumPosts[i].body,
                        image: forumPosts[i].image,
                        date: forumPosts[i].date,
                        latestComment: forumPosts[i].latestComment,
                    });
                }
            }
            returnedPosts.sort((a, b) => {
                if (a.date < b.date)
                    return 1;
                if (a.date > b.date)
                    return -1;
                return 0;
            });
            returnedForumPosts.sort((a, b) => {
                if (a.date < b.date)
                    return 1;
                if (a.date > b.date)
                    return -1;
                return 0;
            });
            return { posts: returnedPosts, users, forumPosts: returnedForumPosts };
        }
        catch (error) {
            throw error;
        }
    }
};
RoomsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Room')),
    __param(1, mongoose_1.InjectModel('User')),
    __param(2, mongoose_1.InjectModel('Post')),
    __param(3, mongoose_1.InjectModel('ForumPost')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map