import { Model } from 'mongoose';
import { ReturnUserDto } from './dto/return-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDocument } from './schemas/user.schema';
import { FindByEmailDto } from './dto/find-by-email-dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getUsers(): Promise<ReturnUserDto[]>;
    getUser(id: string): Promise<ReturnUserDto | {
        msg: string;
    }>;
    createUser({ name, email, password, role }: CreateUserDto): Promise<ReturnUserDto | {
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
    }>;
}
