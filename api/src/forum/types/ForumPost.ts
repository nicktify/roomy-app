export class ForumPost {
  id: string;
  roomId: string;
  authorId: string;
  authorProfilePicture: string;
  authorName: string;
  body: string;
  date: Date;
  comments: [{
    authorId: string,
    authorProfilePicture: string,
    body: string,
  }]
}