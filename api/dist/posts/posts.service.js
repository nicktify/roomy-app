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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const room_schema_1 = require("../rooms/schemas/room.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const returnedObject_1 = require("../utils/returnedObject");
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');
let PostsService = class PostsService {
    constructor(postModel, roomModel, userModel) {
        this.postModel = postModel;
        this.roomModel = roomModel;
        this.userModel = userModel;
    }
    async getAllRoomPost(id) {
        try {
            const room = await this.roomModel.findById(id);
            if (!room)
                return { msg: 'Room not exist.' };
            const posts = await this.postModel.find({ roomId: id });
            if (posts) {
                return posts.map(post => returnedObject_1.returnedPostObject(post));
            }
            return [];
        }
        catch (error) {
            throw error;
        }
    }
    async getPost(id) {
        try {
            const post = await this.postModel.findById(id);
            if (!post)
                return { msg: 'Post not exist.' };
            return returnedObject_1.returnedPostObject(post);
        }
        catch (error) {
            throw error;
        }
    }
    async addNewPost({ authorId, authorProfilePicture, authorName, roomId, body }, file) {
        try {
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Inexistent room' };
            const user = await this.userModel.findById(authorId);
            if (!user)
                return { msg: 'Inexistent user.' };
            const post = await this.postModel.create({ authorId, authorName, roomId, body, date: new Date() });
            if (authorProfilePicture) {
                post.authorProfilePicture = authorProfilePicture;
                post.save();
            }
            if (file) {
                return new Promise((resolve, reject) => {
                    let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" }, function (error, result) {
                        if (error)
                            reject(error);
                        post.image = { url: result.secure_url, size: { width: result.width, height: result.height } };
                        post.save();
                        resolve(returnedObject_1.returnedPostObject(post));
                    });
                    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
                });
            }
            else {
                return returnedObject_1.returnedPostObject(post);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deletePost(postId, roomId) {
        try {
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Room not exist.' };
            await this.postModel.deleteOne({ _id: postId });
            const post = await this.postModel.findById(postId);
            if (!post)
                return { msg: 'Post deleted.' };
            else
                return { msg: 'Please try again.' };
        }
        catch (error) {
            throw error;
        }
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Post')),
    __param(1, mongoose_1.InjectModel('Room')),
    __param(2, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map