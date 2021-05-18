require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
      }),
      inject: [ ConfigService ],
    }),
    UsersModule,
    RoomsModule,
    AuthModule,
    PostsModule,
    ForumModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
