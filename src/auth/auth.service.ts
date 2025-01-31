import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from '@node-rs/argon2';
import { ArtistsService } from 'src/artists/artists.service';
import { UsersService } from 'src/users/users.service';
import { AuthPayload } from './auth.types';
import { LoginDTO } from './dto/login.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService,
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

    const artist = await this.artistsService.findArtist(user.id);
    const payload: AuthPayload = {
      userId: user.id,
      email: user.email,
      ...(artist && { artistId: artist.id }),
    };

    // Generate JWT token
    const token = await this.jwtService.signAsync(payload);

    delete user.password;

    // Return user and token
    return {
      accessToken: token,
    };
  }

  async validateUserByApiKey(apiKey: string): Promise<UserEntity> {
    return this.usersService.findByApiKey(apiKey);
  }
}
