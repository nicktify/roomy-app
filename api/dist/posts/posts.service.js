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
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');
const room_schema_1 = require("../rooms/schemas/room.schema");
let PostsService = class PostsService {
    constructor(postModel, roomModel) {
        this.postModel = postModel;
        this.roomModel = roomModel;
    }
    async getAllRoomPost(id) {
        try {
            const room = await this.roomModel.findById(id);
            if (!room)
                return { msg: 'Room not exist.' };
            let posts = [];
            const insert = (arr, post) => [
                post,
                ...arr
            ];
            for (let i = 0; i < room.posts.length; i++) {
                const post = await this.postModel.findById(room.posts[i]);
                if (post) {
                    const curatedPost = {
                        id: post._id,
                        authorId: post.authorId,
                        authorName: post.authorName,
                        authorProfilePicture: post.authorProfilePicture,
                        roomId: post.roomId,
                        body: post.body,
                        date: post.date,
                        image: post.image,
                    };
                    posts = insert(posts, curatedPost);
                }
            }
            return posts;
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
            const returnedPost = {
                id: post._id,
                roomId: post.roomId,
                authorId: post.authorId,
                authorProfilePicture: post.authorProfilePicture,
                authorName: post.authorName,
                body: post.body,
                date: post.date,
                image: post.image,
            };
            return returnedPost;
        }
        catch (error) {
            throw error;
        }
    }
    async addNewPost({ authorId, authorProfilePicture, authorName, roomId, body }, file) {
        try {
            const room = await this.roomModel.findById(roomId);
            const post = await this.postModel.create({ authorId, authorProfilePicture, authorName, roomId, body, date: new Date() });
            if (file) {
                return new Promise((resolve, reject) => {
                    let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" }, function (error, result) {
                        if (error)
                            reject(error);
                        post.image = { url: result.secure_url, size: { width: result.width, height: result.height } };
                        post.save();
                        room.posts.push(post._id);
                        room.save();
                        const returnedPost = {
                            id: post._id,
                            authorId: post.authorId,
                            authorProfilePicture: post.authorProfilePicture,
                            authorName: post.authorName,
                            roomId: post.roomId,
                            body: post.body,
                            image: post.image,
                            date: post.date
                        };
                        resolve(returnedPost);
                    });
                    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
                });
            }
            else {
                room.posts.push(post._id);
                room.save();
                const returnedPost = {
                    id: post._id,
                    authorId: post.authorId,
                    authorProfilePicture: post.authorProfilePicture,
                    authorName: post.authorName,
                    roomId: post.roomId,
                    body: post.body,
                    image: post.image,
                    date: post.date
                };
                return returnedPost;
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
            room.posts = room.posts.filter(post => post !== postId);
            room.save();
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
    __param(0, mongoose_1.InjectModel('Post')), __param(1, mongoose_1.InjectModel('Room')),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map