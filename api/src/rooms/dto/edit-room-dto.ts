import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRoomDto } from './create-room-dto';

export class EditRoomDto extends CreateRoomDto {

  @IsString()
  @IsNotEmpty()
  id: string;

};