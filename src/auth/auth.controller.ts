import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { ApiKeyGuard } from './guards/apiKey.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }

  @Post('login')
  signin(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(ApiKeyGuard)
  getProfile(
    @Request()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }
}
