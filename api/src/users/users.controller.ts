import { Controller, Delete, Get, Post, Put, Body, UseGuards, Request, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { FindByEmailDto } from './dto/find-by-email-dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { ChangeBackgroundDto } from './dto/change-background.dto';
import { UsersService } from './users.service';
import { ChangeSocialMediaLinkDto } from './dto/change-social-media-link.dto';
import { DeleteSocialMediaLinkDto } from './dto/delete-social-media-link.dto';
import { ChangeAboutDto } from './dto/change-about.tdo';
import { UserIdDto } from './dto/user-id.dto';

@Controller('users')
export class UsersController {
  constructor( private usersService: UsersService, private authService: AuthService ) {}

  // @UseGuards( JwtAuthGuard )
  @Get()
  getUsers(): Promise<ReturnUserDto[]> | { msg: string } {
    return this.usersService.getUsers();
  }

  @Get('get-by-id/:id')
  getUser( @Param() { id }: { id: string } ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.getUser( id );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postUser( @Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.createUser( createUserDto, file );
  }

  @UseGuards( JwtAuthGuard )
  @Post('/add-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  addPicture( @Body() userId: { userId: string }, @UploadedFile() file: Express.Multer.File,  @Request() req ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.addProfilePicture( userId, file, req.user );
  }

  @UseGuards( JwtAuthGuard )
  @Put()
  editUser( @Body() user: EditUserDto, @Request() req ): Promise<ReturnUserDto | { msg: string }> | { msg: string } {
    return this.usersService.editUser( user, req.user );
  }

  @UseGuards( JwtAuthGuard )
  @Delete()
  deleteUser( @Body() { id }: { id: string }, @Request() req ): Promise<{ msg: string }> {
    return this.usersService.deleteUser( id, req.user );
  }

  @UseGuards( JwtAuthGuard )
  @Get('get-by-email')
  getByEmail( @Body() email: FindByEmailDto ): Promise<ReturnUserDto | {msg: string}> {
    return this.usersService.getByEmail( email );
  }

  @UseGuards( AuthGuard('local') )
  @Post('auth/login')
  async login( @Request() req ) {
    return this.authService.login(req.user);
  }

  @UseGuards( JwtAuthGuard )
  @Post('auth/validate-token')
  async validateToken( @Request() req ) {
    return this.authService.validateToken( req.user )
  }

  @UseGuards( JwtAuthGuard )
  @Post('change-password')
  async changePassword( @Body() changePasswordDto: ChangePasswordDto, @Request() req ): Promise<{msg: string}> {
    return this.usersService.changePassword(changePasswordDto, req.user );
  }

  @UseGuards( JwtAuthGuard )
  @UseInterceptors(FileInterceptor('file'))
  @Put('change-profile-background')
  async editProfileBackground( @Body() changeBackgroundDto: ChangeBackgroundDto, @UploadedFile() file: Express.Multer.File ): Promise<ReturnUserDto | {msg: string}> {
    return this.usersService.changeProfileBackground(changeBackgroundDto, file);
  }

  @UseGuards( JwtAuthGuard )
  @Put('change-social-media-link')
  async changeSocialMediaLink(@Body() changeSocialMediaLinkDto: ChangeSocialMediaLinkDto): Promise<ReturnUserDto | {msg: string}> {
    return this.usersService.changeSocialMediaLink(changeSocialMediaLinkDto);
  }

  @UseGuards( JwtAuthGuard )
  @Delete('delete-social-media-link')
  async deleteSocialMediaLink(@Body() deleteSocialMediaLinkDto: DeleteSocialMediaLinkDto): Promise<ReturnUserDto | {msg: string}> {
    return this.usersService.deleteSocialMediaLink(deleteSocialMediaLinkDto);
  }

  @UseGuards( JwtAuthGuard )
  @Put('change-about')
  async changeAbout(@Body() changeAboutDto: ChangeAboutDto): Promise<{msg: string}> {
    return this.usersService.changeAbout(changeAboutDto);
  }

  @UseGuards( JwtAuthGuard )
  @Put('clean-about')
  async deleteAbout(@Body() userIdDto: UserIdDto): Promise<{msg: string}> {
    return this.usersService.clearAbout(userIdDto);
  }

}