import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), AuthModule ],
  controllers: [ UsersController ],
  providers: [ UsersService, AuthService ],
})
export class UsersModule {};
