export class Room {
  id: string;
  name: string;
  owners: string[];
  participants: string[];
  posts: [{ authorId: string, body: string, date: Date, image: string }]
}