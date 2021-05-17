import { IsNotEmpty, IsString } from "class-validator";

export class ReturnPostForumDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
  
  @IsNotEmpty()
  @IsString()
  body: string;
  
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  authorProfilePicture: string;
}