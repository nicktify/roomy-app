import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { FindByEmailDto } from './dto/find-by-email-dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UsersService } from './users.service';
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
    postUser(createUserDto: CreateUserDto): Promise<ReturnUserDto | {
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
}
