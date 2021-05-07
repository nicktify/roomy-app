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
exports.ReturnRoomDto = void 0;
const class_validator_1 = require("class-validator");
class ReturnRoomDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ReturnRoomDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ReturnRoomDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], ReturnRoomDto.prototype, "owners", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], ReturnRoomDto.prototype, "participants", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], ReturnRoomDto.prototype, "links", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], ReturnRoomDto.prototype, "dates", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], ReturnRoomDto.prototype, "posts", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], ReturnRoomDto.prototype, "books", void 0);
exports.ReturnRoomDto = ReturnRoomDto;
;
//# sourceMappingURL=return-room-dto.js.map