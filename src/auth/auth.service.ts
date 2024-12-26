import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from '@node-rs/argon2';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDTO) {
    // Find user by email
    const user = await this.usersService.findOne(loginDto.email);

    // Compare passwords
    const passwordMatches = await argon2.verify(
      user.password,
      loginDto.password,
    );

    // If password incorrect throw exception
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    // Generate JWT token
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    delete user.password;

    // Return user and token
    return {
      access_token: token,
      user,
    };
  }
}
