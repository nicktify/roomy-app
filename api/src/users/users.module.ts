import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { PostSchema } from 'src/posts/schemas/post.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Post', schema: PostSchema }]), AuthModule ],
  controllers: [ UsersController ],
  providers: [ UsersService, AuthService ],
})
export class UsersModule {};
