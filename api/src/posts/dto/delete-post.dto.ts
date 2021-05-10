import { IsNotEmpty, IsString } from "class-validator";

export class DeletePostDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  postId: string;
}