import { User } from 'src/users/interfaces/user.interface';
import { CreateRoomDto } from './create-room-dto';

export class ReturnRoomDto {

  name: string;

  password: string;

  participants: User[];
  
};