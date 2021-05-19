import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');

import { RoomDocument } from 'src/rooms/schemas/room.schema';
import { PostDocument } from './schemas/post.schema';
import { ReturnPostDto } from './dto/return-post-dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './types/post';

@Injectable()
export class PostsService {

  constructor( @InjectModel('Post') private postModel: Model<PostDocument>, @InjectModel('Room') private roomModel: Model<RoomDocument> ) {}

  async getAllRoomPost(id: string): Promise<ReturnPostDto[] | { msg: string }> {
    try {
      const room = await this.roomModel.findById( id );

      if ( ! room ) return { msg: 'Room not exist.' }

      let posts = [];

      const insert = (arr: ReturnPostDto[], post: Post) => [
        post,
        ...arr
      ]

      for (let i = 0; i < room.posts.length; i ++) {
        const post = await this.postModel.findById( room.posts[i] );

        if (post) {
          const curatedPost: Post = {
            id: post._id,
            authorId: post.authorId,
            authorName: post.authorName,
            authorProfilePicture: post.authorProfilePicture,
            roomId: post.roomId,
            body: post.body,
            date: post.date,
            image: post.image,
          }

          posts = insert(posts, curatedPost);
        }

      }

      return posts;

    } catch (error) {
      throw error;
    }
  }

  async getPost( id: string ): Promise<ReturnPostDto | { msg: string }> {
    try {
      const post = await this.postModel.findById(id);

      if ( ! post ) return { msg: 'Post not exist.' }
      
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

      if (file) {
        return new Promise(( resolve, reject ) => {
  
            let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
            function (error, result) {
  
              if (error) reject(error);
  
              post.image = { url: result.secure_url, size: { width: result.width, height: result.height }}
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
      } else {

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
        return returnedPost;
      }
      
    } catch (error) {
      throw error;
    }
  }

  async deletePost( postId, roomId ): Promise<{ msg: string }> {
    try {

      const room = await this.roomModel.findById( roomId );

      if ( ! room  ) return { msg: 'Room not exist.' }

      room.posts = room.posts.filter(post => post !== postId);
      room.save();

      await this.postModel.deleteOne({ _id: postId });
      const post = await this.postModel.findById( postId );
      if (!post) return { msg: 'Post deleted.' };
      else return { msg: 'Please try again.' };

    } catch (error) {
      throw error;
    }
  }

}
