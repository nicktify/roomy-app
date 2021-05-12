/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { FindByEmailDto } from './dto/find-by-email-dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { ChangeBackgroundDto } from './dto/change-background.dto';
import { UsersService } from './users.service';
import { ChangeSocialMediaLinkDto } from './dto/change-social-media-link.dto';
import { DeleteSocialMediaLinkDto } from './dto/delete-social-media-link.dto';
import { ChangeAboutDto } from './dto/change-about.tdo';
import { UserIdDto } from './dto/user-id.dto';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    getUsers(): Promise<ReturnUserDto[]> | {
        msg: string;
    };
    getUser({ id }: {
        id: string;
    }): Promise<ReturnUserDto | {
        msg: string;
    }>;
    postUser(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<ReturnUserDto | {
        msg: string;
    }>;
    addPicture(userId: {
        userId: string;
    }, file: Express.Multer.File, req: any): Promise<ReturnUserDto | {
        msg: string;
    }>;
    editUser(user: EditUserDto, req: any): Promise<ReturnUserDto | {
        msg: string;
    }> | {
        msg: string;
    };
    deleteUser({ id }: {
        id: string;
    }, req: any): Promise<{
        msg: string;
    }>;
    getByEmail(email: FindByEmailDto): Promise<ReturnUserDto | {
        msg: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
        user: ReturnUserDto;
    }>;
    validateToken(req: any): Promise<{
        access_token: string;
        user: ReturnUserDto;
    } | {
        msg: string;
    }>;
    changePassword(changePasswordDto: ChangePasswordDto, req: any): Promise<{
        msg: string;
    }>;
    editProfileBackground(changeBackgroundDto: ChangeBackgroundDto, file: Express.Multer.File): Promise<ReturnUserDto | {
        msg: string;
    }>;
    changeSocialMediaLink(changeSocialMediaLinkDto: ChangeSocialMediaLinkDto): Promise<ReturnUserDto | {
        msg: string;
    }>;
    deleteSocialMediaLink(deleteSocialMediaLinkDto: DeleteSocialMediaLinkDto): Promise<ReturnUserDto | {
        msg: string;
    }>;
    changeAbout(changeAboutDto: ChangeAboutDto): Promise<{
        msg: string;
    }>;
    deleteAbout(userIdDto: UserIdDto): Promise<{
        msg: string;
    }>;
}
