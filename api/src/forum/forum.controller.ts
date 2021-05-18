import { Controller } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor( private forumService: ForumService) {}
}
