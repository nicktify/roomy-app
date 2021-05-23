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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const change_password_dto_1 = require("./dto/change-password.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const edit_user_dto_1 = require("./dto/edit-user.dto");
const find_by_email_dto_1 = require("./dto/find-by-email-dto");
const change_background_dto_1 = require("./dto/change-background.dto");
const users_service_1 = require("./users.service");
const change_social_media_link_dto_1 = require("./dto/change-social-media-link.dto");
const delete_social_media_link_dto_1 = require("./dto/delete-social-media-link.dto");
const change_about_tdo_1 = require("./dto/change-about.tdo");
const user_id_dto_1 = require("./dto/user-id.dto");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    getUsers() {
        return this.usersService.getUsers();
    }
    getUser({ id }) {
        return this.usersService.getUser(id);
    }
    postUser(createUserDto, file) {
        return this.usersService.createUser(createUserDto, file);
    }
    emailConfirmation(params) {
        return this.usersService.emailConfirmation(params);
    }
    addPicture(userId, file, req) {
        return this.usersService.addProfilePicture(userId, file, req.user);
    }
    editUser(user, req) {
        return this.usersService.editUser(user, req.user);
    }
    deleteUser({ id }, req) {
        return this.usersService.deleteUser(id, req.user);
    }
    getByEmail(email) {
        return this.usersService.getByEmail(email);
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async validateToken(req) {
        return this.authService.validateToken(req.user);
    }
    async changePassword(changePasswordDto, req) {
        return this.usersService.changePassword(changePasswordDto, req.user);
    }
    async editProfileBackground(changeBackgroundDto, file) {
        return this.usersService.changeProfileBackground(changeBackgroundDto, file);
    }
    async changeSocialMediaLink(changeSocialMediaLinkDto) {
        return this.usersService.changeSocialMediaLink(changeSocialMediaLinkDto);
    }
    async deleteSocialMediaLink(deleteSocialMediaLinkDto) {
        return this.usersService.deleteSocialMediaLink(deleteSocialMediaLinkDto);
    }
    async changeAbout(changeAboutDto) {
        return this.usersService.changeAbout(changeAboutDto);
    }
    async deleteAbout(userIdDto) {
        return this.usersService.clearAbout(userIdDto);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getUsers", null);
__decorate([
    common_1.Get('get-by-id/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "postUser", null);
__decorate([
    common_1.Get('email-confirmation/:userId/special-info/:emailConfirmationPassword'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "emailConfirmation", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/add-profile-picture'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPicture", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_user_dto_1.EditUserDto, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "editUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('get-by-email/:email'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_by_email_dto_1.FindByEmailDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getByEmail", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('local')),
    common_1.Post('auth/login'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('auth/validate-token'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "validateToken", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('change-password'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    common_1.Put('change-profile-background'),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_background_dto_1.ChangeBackgroundDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editProfileBackground", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('change-social-media-link'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_social_media_link_dto_1.ChangeSocialMediaLinkDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeSocialMediaLink", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('delete-social-media-link'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_social_media_link_dto_1.DeleteSocialMediaLinkDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteSocialMediaLink", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('change-about'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_about_tdo_1.ChangeAboutDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeAbout", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('clean-about'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_id_dto_1.UserIdDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAbout", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map