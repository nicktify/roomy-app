/// <reference types="multer" />
import { Model } from 'mongoose';
import { ReturnUserDto } from './dto/return-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDocument } from './schemas/user.schema';
import { FindByEmailDto } from './dto/find-by-email-dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PostDocument } from 'src/posts/schemas/post.schema';
import { ChangeSocialMediaLinkDto } from './dto/change-social-media-link.dto';
import { DeleteSocialMediaLinkDto } from './dto/delete-social-media-link.dto';
import { ChangeAboutDto } from './dto/change-about.tdo';
import { UserIdDto } from './dto/user-id.dto';
export declare class UsersService {
    private userModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, postModel: Model<PostDocument>);
    getUsers(): Promise<ReturnUserDto[]>;
    getUser(id: string): Promise<ReturnUserDto | {
        msg: string;
    }>;
    createUser({ name, email, password }: CreateUserDto, file: Express.Multer.File): Promise<{
        msg: string;
    }>;
    emailConfirmation({ userId, emailConfirmationPassword }: {
        userId: any;
        emailConfirmationPassword: any;
    }): Promise<any>;
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
    getByEmail({ email }: FindByEmailDto): Promise<ReturnUserDto | {
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
    changeProfileBackground({ userId }: {
        userId: any;
    }, file: Express.Multer.File): Promise<ReturnUserDto | {
        msg: string;
    }>;
    changeSocialMediaLink({ userId, type, link }: ChangeSocialMediaLinkDto): Promise<ReturnUserDto | {
        msg: string;
    }>;
    deleteSocialMediaLink({ userId, type }: DeleteSocialMediaLinkDto): Promise<ReturnUserDto | {
        msg: string;
    }>;
    changeAbout({ userId, about }: ChangeAboutDto): Promise<{
        msg: string;
    }>;
    clearAbout({ userId }: UserIdDto): Promise<{
        msg: string;
    }>;
}
