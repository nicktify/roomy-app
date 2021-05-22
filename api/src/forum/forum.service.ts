import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoomDocument } from "src/rooms/schemas/room.schema";
import { UserDocument } from "src/users/schemas/user.schema";
import { AddForumPostCommentDto } from "./dto/add-forum-post-comment.dto";
import { CreateForumPostDto } from "./dto/create-forum-post.dto";
import { DeleteForumPostDto } from "./dto/delete-forum-post.dto";
import { GetAllForumPostCommentsDto } from "./dto/get-all-forum-post-comments.dto";
import { GetAllRoomForumPostDto } from "./dto/get-all-room-forum-posts.dto";
import { ReturnForumPostCommentDto } from "./dto/return-forum-post-comment.dto";
import { ReturnForumPostDto } from "./dto/return-forum-post.dto";
import { ForumPostCommentDocument } from "./schemas/forum-post-comment.schema";
import { ForumPostDocument } from "./schemas/forum-post.schema";
import { DeleteForumPostCommentDto } from './dto/delete-forum-post-comment.dto';
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');

@Injectable()
export class ForumService {
  constructor( @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Room') private roomModel: Model<RoomDocument>,
    @InjectModel('ForumPost') private forumPostModel: Model<ForumPostDocument>,
    @InjectModel('ForumPostComment') private forumPostCommentModel: Model<ForumPostCommentDocument>
    ) {}

  async createNewForumPost({ authorId, roomId, body }: CreateForumPostDto, file: Express.Multer.File ): Promise<ReturnForumPostDto | {msg:string}> {
    try {
      const user = await this.userModel.findById( authorId );
      if (!user) return {msg: 'Inexistent user.'}

      const room = await this.roomModel.findById( roomId );
      if (!room) return {msg: 'Inexistent room.'}

      const forumPost = await this.forumPostModel.create({
        roomId,
        authorId,
        authorName: user.name,
        authorProfilePicture: user.profilePicture,
        body,
        date: new Date(),
      });

      if (!file) {
        return {
          id: forumPost._id,
          roomId: forumPost.roomId,
          authorId: forumPost.authorId,
          authorName: forumPost.authorName,
          authorProfilePicture: forumPost.authorProfilePicture,
          body: forumPost.body,
          image: forumPost.image,
          date: forumPost.date,
          comments: forumPost.comments,
        }
      }

      return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
        function (error, result) {
          if (error) reject({ msg: 'Error uploading image.' });

          forumPost.image = result.secure_url;
          forumPost.save();

          resolve({
            id: forumPost._id,
            roomId: forumPost.roomId,
            authorId: forumPost.authorId,
            authorName: forumPost.authorName,
            authorProfilePicture: forumPost.authorProfilePicture,
            body: forumPost.body,
            image: forumPost.image,
            date: forumPost.date,
            comments: forumPost.comments,
          });
        }
      );
      streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
      })
    } catch (error) {
      throw error;
    }
  }

  async getAllRoomForumPost({roomId}: GetAllRoomForumPostDto): Promise<ReturnForumPostDto[] | {msg: string}> {
    try {
      const room = await this.roomModel.findById( roomId );
      if (!room) return {msg: 'Inexistent room.'};
      const forumPost = await this.forumPostModel.find({ roomId });
      
      const returnedForumPost: ReturnForumPostDto[] = forumPost.map(forumPost => ({
        id: forumPost._id,
        roomId: forumPost.roomId,
        authorId: forumPost.authorId,
        authorName: forumPost.authorName,
        authorProfilePicture: forumPost.authorProfilePicture,
        body: forumPost.body,
        image: forumPost.image,
        date: forumPost.date,
        comments: forumPost.comments,
      }))

      returnedForumPost.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      })

      return returnedForumPost;
    } catch (error) {
      throw error;
    }
  }

  async getAllForumPostComments({forumPostId}: GetAllForumPostCommentsDto): Promise<ReturnForumPostCommentDto[] | {msg: string}> {
    try {
      const forumPost = await this.forumPostModel.findById(forumPostId);
      if (!forumPost) return {msg: 'Inexistent forum post.'}

      const forumPostComments = await this.forumPostCommentModel.find({ forumPostId });
      if (!forumPostComments) return;

      const returnedForumPostComments = forumPostComments.map(comment => ({
        id: comment._id,
        forumPostId: comment.forumPostId,
        authorId: comment.authorId,
        authorName: comment.authorName,
        authorProfilePicture: comment.authorProfilePicture,
        body: comment.body,
        date: comment.date,
      }))

      returnedForumPostComments.sort((a, b) => {
        if (a.date < b.date) return 1

        if (a.date > b.date) return -1

        return 0
      })

      return returnedForumPostComments;

    } catch (error) {
      throw error;
    }
  }

  async addForumPostComment({forumPostId, authorId, body}: AddForumPostCommentDto): Promise<{msg: string}> {
    try {
      const forumPost = await this.forumPostModel.findById(forumPostId)
      if (!forumPost) return {msg: 'Inexistent post.'}

      const author = await this.userModel.findById(authorId);
      if (!author) return {msg: 'Inexistent user.'}

      const comment = await this.forumPostCommentModel.create({
        forumPostId,
        authorId,
        authorName: author.name,
        authorProfilePicture: author.profilePicture,
        body,
        date: new Date()
      })

      forumPost.comments.push(comment._id);
      forumPost.save();

      return {msg: 'Comment created.'}
    } catch (error) {
      throw error;
    }
  }

  async deleteForumPost({forumPostId}: DeleteForumPostDto): Promise<{msg: string}> {
    try {
      await this.forumPostModel.findByIdAndDelete(forumPostId);
      const forumPost = await this.forumPostModel.findById(forumPostId);
      if (!forumPost) return {msg: 'Forum post deleted.'}
      else return {msg: 'Please try again.'}
    } catch (error) {
      throw error;
    }
  }

  async deleteForumPostComment({forumPostCommentId}: DeleteForumPostCommentDto): Promise<{msg: string}> {
    try {
      await this.forumPostCommentModel.deleteOne({_id: forumPostCommentId});
      const comment = await this.forumPostCommentModel.findById(forumPostCommentId);
      if (!comment) return {msg: 'Comment deleted.'}
      return {msg: 'Please try again.'}
    } catch (error) {
      throw error;
    }
  }
}