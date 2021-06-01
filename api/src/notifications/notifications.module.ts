import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema}
    ])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
