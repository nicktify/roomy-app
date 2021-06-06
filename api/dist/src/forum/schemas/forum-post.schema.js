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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumPostSchema = exports.ForumPost = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ForumPost = class ForumPost {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ForumPost.prototype, "roomId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ForumPost.prototype, "authorId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ForumPost.prototype, "authorProfilePicture", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ForumPost.prototype, "authorName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ForumPost.prototype, "body", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ForumPost.prototype, "image", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], ForumPost.prototype, "date", void 0);
__decorate([
    mongoose_1.Prop({ type: Object }),
    __metadata("design:type", Object)
], ForumPost.prototype, "latestComment", void 0);
ForumPost = __decorate([
    mongoose_1.Schema()
], ForumPost);
exports.ForumPost = ForumPost;
exports.ForumPostSchema = mongoose_1.SchemaFactory.createForClass(ForumPost);
//# sourceMappingURL=forum-post.schema.js.map