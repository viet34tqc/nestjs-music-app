import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }
}
