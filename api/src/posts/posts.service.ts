import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');

import { RoomDocument } from 'src/rooms/schemas/room.schema';
import { PostDocument } from './schemas/post.schema';
import { ReturnPostDto } from './dto/return-post-dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {

  constructor( @InjectModel('Post') private postModel: Model<PostDocument>, @InjectModel('Room') private roomModel: Model<RoomDocument> ) {}

  async getPost( id: string ): Promise<ReturnPostDto> {
    try {
      const post = await this.postModel.findById(id);
      
      const returnedPost: ReturnPostDto = {
        id: post._id,
        roomId: post.roomId,
        authorId: post.authorId,
        authorProfilePicture: post.authorProfilePicture,
        authorName: post.authorName,
        body: post.body,
        date: post.date,
        image: post.image,
      }
      return returnedPost;
    } catch (error) {
      throw error;
    }
  }

  async addNewPost( { authorId, authorProfilePicture, authorName, roomId, body }: CreatePostDto, file: Express.Multer.File ): Promise<ReturnPostDto> {
    try {

      const room = await this.roomModel.findById(roomId);
      const post = await this.postModel.create({ authorId, authorProfilePicture, authorName, roomId, body, date: new Date() });

      return new Promise(( resolve, reject ) => {

          let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
          function (error, result) {

            if (error) reject(error);

            post.image = result.secure_url;
            post.save();
            
            room.posts.push(post._id);
            room.save();

            const returnedPost: ReturnPostDto = {
              id: post._id,
              authorId: post.authorId,
              authorProfilePicture: post.authorProfilePicture,
              authorName: post.authorName,
              roomId: post.roomId,
              body: post.body,
              image: post.image,
              date: post.date
            }
            resolve(returnedPost);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
      })
      
    } catch (error) {
      throw error;
    }
  }

}
