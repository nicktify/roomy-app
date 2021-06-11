import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDocument } from 'src/rooms/schemas/room.schema';
import { PostDocument } from './schemas/post.schema';
import { ReturnPostDto } from './dto/return-post-dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { returnedPostObject } from 'src/utils/returnedObject';
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');

@Injectable()
export class PostsService {

  constructor( 
    @InjectModel('Post') private postModel: Model<PostDocument>,
    @InjectModel('Room') private roomModel: Model<RoomDocument>,
    @InjectModel('User') private userModel: Model<UserDocument> ) {}


  async getAllRoomPost(id: string): Promise<ReturnPostDto[] | { msg: string }> {
    try {
      const room = await this.roomModel.findById( id );
      if ( ! room ) return { msg: 'Room not exist.' }

      const posts = await this.postModel.find({roomId: id});
      
      if (posts) {
        return posts.map(post => returnedPostObject(post));
      }

      return [];
    } catch (error) {
      throw error;
    }
  }


  async getPost( id: string ): Promise<ReturnPostDto | { msg: string }> {
    try {
      const post = await this.postModel.findById(id);
      if ( ! post ) return { msg: 'Post not exist.' }

      return returnedPostObject(post);
    } catch (error) {
      throw error;
    }
  }


  async addNewPost( { authorId, authorProfilePicture, authorName, roomId, body }: CreatePostDto, file: Express.Multer.File ): Promise<ReturnPostDto | {msg: string}> {
    try {
      const room = await this.roomModel.findById(roomId);
      if (!room) return {msg: 'Inexistent room'}
      const user = await this.userModel.findById(authorId)
      if (!user) return {msg: 'Inexistent user.'}
      const post = await this.postModel.create({ authorId, authorName, roomId, body, date: new Date() });

      if (authorProfilePicture) {
        post.authorProfilePicture = authorProfilePicture;
        post.save()
      }

      if (file) {
        return new Promise(( resolve, reject ) => {
            let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
            function (error, result) {
              if (error) reject(error);
              post.image = { url: result.secure_url, size: { width: result.width, height: result.height }}
              post.save();
              resolve(returnedPostObject(post));
            }
          );
          streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
        })
      } else {
        return returnedPostObject(post);
      }
    } catch (error) {
      throw error;
    }
  }


  async deletePost( postId, roomId ): Promise<{ msg: string }> {
    try {
      const room = await this.roomModel.findById( roomId );

      if ( ! room  ) return { msg: 'Room not exist.' }

      await this.postModel.deleteOne({ _id: postId });

      const post = await this.postModel.findById( postId );

      if ( ! post ) return { msg: 'Post deleted.' };

      else return { msg: 'Please try again.' };
    } catch (error) {
      throw error;
    }
  }
}
