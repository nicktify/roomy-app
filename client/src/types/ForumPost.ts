export class ForumPost {
  id: string;
  roomId: string;
  authorId: string;
  image: string;
  authorProfilePicture: string;
  authorName: string;
  body: string;
  date: Date;
  latestComment: {
    authorId: string;
    authorName: string;
    authorProfilePicture: string;
    body: string;
  }
}