import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ReturnRoomDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  owners: string[];

  @IsNotEmpty()
  @IsArray()
  participants: string[];

  @IsNotEmpty()
  @IsArray()
  links: [
    { 
      name: string, 
      link:string 
    }
  ]

  @IsNotEmpty()
  @IsArray()
  dates: [
    {
      name: string, 
      date: Date, 
      description: string
    }
  ]

  @IsNotEmpty()
  @IsArray()
  posts: [
    {
      authorId: string;
      body: string;
      date: Date;
    }
  ]

  @IsNotEmpty()
  @IsArray()
  books: [
    {
      name: string;
      description: string;
      link: string;
    }
  ]
  
};