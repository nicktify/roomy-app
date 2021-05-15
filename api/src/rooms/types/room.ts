export class Room {
  id: string;
  name: string;
  owners: string[];
  participants: string[];
  links: [
    { 
      name: string, 
      link:string 
    }
  ]
  dates: [
    {
      name: string, 
      date: Date, 
      description: string
    }
  ]
  posts: string[]
  books: [
    {
      name: string;
      description: string;
      link: string;
    }
  ]
}