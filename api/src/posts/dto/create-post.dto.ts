import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()
  authorProfilePicture: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  authorName: string;
}