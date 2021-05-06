import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    validateUser({ username, password }: {
        username: any;
        password: any;
    }): Promise<any>;
    login(user: ReturnUserDto): Promise<{
        access_token: string;
        user: ReturnUserDto;
    }>;
    validateToken({ email, userId }: {
        email: string;
        userId: string;
    }): Promise<{
        access_token: string;
        user: ReturnUserDto;
    } | {
        msg: string;
    }>;
}
