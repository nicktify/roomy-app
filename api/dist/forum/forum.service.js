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
exports.ForumService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const room_schema_1 = require("../rooms/schemas/room.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');
let ForumService = class ForumService {
    constructor(userModel, roomModel, forumPostModel, forumPostCommentModel) {
        this.userModel = userModel;
        this.roomModel = roomModel;
        this.forumPostModel = forumPostModel;
        this.forumPostCommentModel = forumPostCommentModel;
    }
    async createNewForumPost({ authorId, roomId, body }, file) {
        try {
            const user = await this.userModel.findById(authorId);
            if (!user)
                return { msg: 'Inexistent user.' };
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Inexistent room.' };
            const forumPost = await this.forumPostModel.create({
                roomId,
                authorId,
                authorName: user.name,
                authorProfilePicture: user.profilePicture,
                body,
                date: new Date(),
            });
            if (!file) {
                return {
                    id: forumPost._id,
                    roomId: forumPost.roomId,
                    authorId: forumPost.authorId,
                    authorName: forumPost.authorName,
                    authorProfilePicture: forumPost.authorProfilePicture,
                    body: forumPost.body,
                    image: forumPost.image,
                    date: forumPost.date,
                    comments: forumPost.comments,
                };
            }
            return new Promise((resolve, reject) => {
                let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" }, function (error, result) {
                    if (error)
                        reject({ msg: 'Error uploading image.' });
                    forumPost.image = result.secure_url;
                    forumPost.save();
                    resolve({
                        id: forumPost._id,
                        roomId: forumPost.roomId,
                        authorId: forumPost.authorId,
                        authorName: forumPost.authorName,
                        authorProfilePicture: forumPost.authorProfilePicture,
                        body: forumPost.body,
                        image: forumPost.image,
                        date: forumPost.date,
                        comments: forumPost.comments,
                    });
                });
                streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getAllRoomForumPost({ roomId }) {
        try {
            const room = await this.roomModel.findById(roomId);
            if (!room)
                return { msg: 'Inexistent room.' };
            const forumPost = await this.forumPostModel.find({ roomId });
            const returnedForumPost = forumPost.map(forumPost => ({
                id: forumPost._id,
                roomId: forumPost.roomId,
                authorId: forumPost.authorId,
                authorName: forumPost.authorName,
                authorProfilePicture: forumPost.authorProfilePicture,
                body: forumPost.body,
                image: forumPost.image,
                date: forumPost.date,
                comments: forumPost.comments,
            }));
            return returnedForumPost;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllForumPostComments({ forumPostId }) {
        try {
            const forumPost = await this.forumPostModel.findById(forumPostId);
            if (!forumPost)
                return { msg: 'Inexistent forum post.' };
            const forumPostComments = await this.forumPostCommentModel.find({ forumPostId });
            if (!forumPostComments)
                return;
            const returnedForumPostComments = forumPostComments.map(comment => ({
                id: comment._id,
                forumPostId: comment.forumPostId,
                authorId: comment.authorId,
                authorName: comment.authorName,
                authorProfilePicture: comment.authorProfilePicture,
                body: comment.body,
                date: comment.date,
            }));
            returnedForumPostComments.sort((a, b) => {
                if (a.date < b.date)
                    return 1;
                if (a.date > b.date)
                    return -1;
                return 0;
            });
            return returnedForumPostComments;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteForumPost({ forumPostId }) {
        try {
            await this.forumPostModel.findByIdAndDelete(forumPostId);
            const forumPost = await this.forumPostModel.findById(forumPostId);
            if (!forumPost)
                return { msg: 'Forum post deleted.' };
            else
                return { msg: 'Please try again.' };
        }
        catch (error) {
            throw error;
        }
    }
    async addForumPostComment({ forumPostId, authorId, body }) {
        try {
            const forumPost = await this.forumPostModel.findById(forumPostId);
            if (!forumPost)
                return { msg: 'Inexistent post.' };
            const author = await this.userModel.findById(authorId);
            if (!author)
                return { msg: 'Inexistent user.' };
            const comment = await this.forumPostCommentModel.create({
                forumPostId,
                authorId,
                authorName: author.name,
                authorProfilePicture: author.profilePicture,
                body,
                date: new Date()
            });
            forumPost.comments.push(comment._id);
            return { msg: 'Comment created.' };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteForumPostComment({ forumPostCommentId }) {
        try {
            await this.forumPostCommentModel.deleteOne({ _id: forumPostCommentId });
            const comment = await this.forumPostCommentModel.findById(forumPostCommentId);
            if (!comment)
                return { msg: 'Comment deleted.' };
            return { msg: 'Please try again.' };
        }
        catch (error) {
            throw error;
        }
    }
};
ForumService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __param(1, mongoose_1.InjectModel('Room')),
    __param(2, mongoose_1.InjectModel('ForumPost')),
    __param(3, mongoose_1.InjectModel('ForumPostComment')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ForumService);
exports.ForumService = ForumService;
//# sourceMappingURL=forum.service.js.map