/// <reference types="multer" />
import { Model } from 'mongoose';
import { ReturnUserDto } from './dto/return-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDocument } from './schemas/user.schema';
import { FindByEmailDto } from './dto/find-by-email-dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getUsers(): Promise<ReturnUserDto[]>;
    getUser(id: string): Promise<ReturnUserDto | {
        msg: string;
    }>;
    createUser({ name, email, password, role }: CreateUserDto, file: Express.Multer.File): Promise<ReturnUserDto | {
        msg: string;
    }>;
    changePassword({ newPassword, oldPassword, userId }: ChangePasswordDto, user: any): Promise<{
        msg: string;
    }>;
    addProfilePicture({ userId }: {
        userId: string;
    }, file: Express.Multer.File, authenticatedUser: any): Promise<ReturnUserDto | {
        msg: string;
    }>;
    editUser({ id, name, email, role }: EditUserDto, authenticatedUser: any): Promise<ReturnUserDto | {
        msg: string;
    }>;
    deleteUser(id: string, authenticatedUser: any): Promise<{
        msg: string;
    }>;
    getByEmail(email: FindByEmailDto): Promise<ReturnUserDto | {
        msg: string;
    }>;
    validateUser(user: any): Promise<{
        msg: string;
        validToken: boolean;
        user?: undefined;
    } | {
        msg: string;
        validToken: boolean;
        user: UserDocument;
    }>;
}
