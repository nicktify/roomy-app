"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumModule = void 0;
const common_1 = require("@nestjs/common");
const forum_service_1 = require("./forum.service");
const forum_controller_1 = require("./forum.controller");
const mongoose_1 = require("@nestjs/mongoose");
const room_schema_1 = require("../rooms/schemas/room.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const forum_post_comment_schema_1 = require("./schemas/forum-post-comment.schema");
const forum_post_schema_1 = require("./schemas/forum-post.schema");
let ForumModule = class ForumModule {
};
ForumModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Room', schema: room_schema_1.RoomSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'ForumPost', schema: forum_post_schema_1.ForumPostSchema },
                { name: 'ForumPostComment', schema: forum_post_comment_schema_1.ForumPostCommentSchema },
            ]),
        ],
        providers: [forum_service_1.ForumService],
        controllers: [forum_controller_1.ForumController]
    })
], ForumModule);
exports.ForumModule = ForumModule;
//# sourceMappingURL=forum.module.js.map