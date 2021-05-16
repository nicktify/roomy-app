export class Post {
  id: string;
  roomId: string;
  authorId: string;
  authorProfilePicture: string;
  authorName: string;
  body: string;
  date: Date;
  image: {
    url: string,
    size: { width: number, height: number };
  };
}