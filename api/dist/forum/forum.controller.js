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
exports.ForumController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const add_forum_post_comment_dto_1 = require("./dto/add-forum-post-comment.dto");
const create_forum_post_dto_1 = require("./dto/create-forum-post.dto");
const delete_forum_post_comment_dto_1 = require("./dto/delete-forum-post-comment.dto");
const delete_forum_post_dto_1 = require("./dto/delete-forum-post.dto");
const get_all_room_forum_posts_dto_1 = require("./dto/get-all-room-forum-posts.dto");
const forum_service_1 = require("./forum.service");
let ForumController = class ForumController {
    constructor(forumService) {
        this.forumService = forumService;
    }
    async createNewForumPost(createForumPostDto, file) {
        return this.forumService.createNewForumPost(createForumPostDto, file);
    }
    async getAllRoomForumPosts(roomId) {
        return this.forumService.getAllRoomForumPost(roomId);
    }
    async deleteForumPost(forumPostId) {
        return this.forumService.deleteForumPost(forumPostId);
    }
    async addForumPostComment(addForumPostCommentDto) {
        return this.forumService.addForumPostComment(addForumPostCommentDto);
    }
    async getAllForumPostComments(forumPostId) {
        return this.forumService.getAllForumPostComments(forumPostId);
    }
    async deleteForumPostComment(deleteForumPostCommentDto) {
        return this.forumService.deleteForumPostComment(deleteForumPostCommentDto);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('create-new-forum-post'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forum_post_dto_1.CreateForumPostDto, Object]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "createNewForumPost", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('get-all-room-forum-posts/:roomId'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_room_forum_posts_dto_1.GetAllRoomForumPostDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getAllRoomForumPosts", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('delete-forum-post/:forumPostId'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_forum_post_dto_1.DeleteForumPostDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "deleteForumPost", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('add-forum-post-comment'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_forum_post_comment_dto_1.AddForumPostCommentDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "addForumPostComment", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('get-all-forum-post-comments/:forumPostId'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getAllForumPostComments", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('delete-forum-post-comment'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_forum_post_comment_dto_1.DeleteForumPostCommentDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "deleteForumPostComment", null);
ForumController = __decorate([
    common_1.Controller('forum'),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumController);
exports.ForumController = ForumController;
//# sourceMappingURL=forum.controller.js.map