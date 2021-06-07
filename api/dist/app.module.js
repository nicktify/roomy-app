"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require('dotenv').config();
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const rooms_module_1 = require("./rooms/rooms.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const posts_module_1 = require("./posts/posts.module");
const forum_module_1 = require("./forum/forum.module");
const notifications_module_1 = require("./notifications/notifications.module");
const notifications_gateway_1 = require("./notifications.gateway");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    uri: process.env.MONGODB_URI,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            rooms_module_1.RoomsModule,
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            forum_module_1.ForumModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, notifications_gateway_1.NotificationsGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map