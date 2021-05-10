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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const create_room_dto_1 = require("./dto/create-room-dto");
const rooms_service_1 = require("./rooms.service");
const edit_room_dto_1 = require("./dto/edit-room-dto");
const add_new_owner_dto_1 = require("./dto/add-new-owner-dto");
const delete_owner_dto_1 = require("./dto/delete-owner-dto");
const add_new_participant_dto_1 = require("./dto/add-new-participant-dto");
const delete_participant_dto_1 = require("./dto/delete-participant-dto");
const add_new_book_dto_1 = require("./dto/add-new-book-dto");
const add_new_link_dto_1 = require("./dto/add-new-link-dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RoomsController = class RoomsController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    getRooms() {
        return this.roomService.getRooms();
    }
    getRoom({ id }) {
        return this.roomService.getRoom(id);
    }
    postRoom(createRoomDto, req) {
        return this.roomService.createRoom(createRoomDto, req.user);
    }
    editRoom(room, req) {
        return this.roomService.editRoom(room, req.user);
    }
    deleteRoom({ id, owner }, req) {
        return this.roomService.deleteRoom(id, owner, req.user);
    }
    addNewOwner(addNewOwnerDto, req) {
        return this.roomService.addNewOwner(addNewOwnerDto, req.user);
    }
    deleteOwner(deleteOwnerDto, req) {
        return this.roomService.deleteOwner(deleteOwnerDto, req.user);
    }
    addNewParticipant(addNewParticipantDto, req) {
        return this.roomService.addNewParticipant(addNewParticipantDto, req.user);
    }
    deleteParticipant(deleteParticipantDto, req) {
        return this.roomService.deleteParticipant(deleteParticipantDto, req.user);
    }
    addNewBook(addNewBookDto, req) {
        return this.roomService.addNewBook(addNewBookDto, req.user);
    }
    addNewLink(addNewLinkDto, req) {
        return this.roomService.addNewLink(addNewLinkDto, req.user);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRooms", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('user-room/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoom", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "postRoom", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_room_dto_1.EditRoomDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "editRoom", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "deleteRoom", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('newowner'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_new_owner_dto_1.AddNewOwnerDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "addNewOwner", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('deleteowner'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_owner_dto_1.DeleteOwnerDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "deleteOwner", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('newparticipant'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_new_participant_dto_1.addNewParticipantDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "addNewParticipant", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('deleteparticipant'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_participant_dto_1.DeleteParticipantDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "deleteParticipant", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('books'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_new_book_dto_1.AddNewBookDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "addNewBook", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('links'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_new_link_dto_1.AddNewLinkDto, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "addNewLink", null);
RoomsController = __decorate([
    common_1.Controller('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
exports.RoomsController = RoomsController;
//# sourceMappingURL=rooms.controller.js.map