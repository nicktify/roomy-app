import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRoomDto } from './create-room-dto';

export class EditRoomDto extends CreateRoomDto {

  @IsNotEmpty()
  @IsString()
  id: string;

};