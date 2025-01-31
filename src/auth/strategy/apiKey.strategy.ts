import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from '../auth.service';

@Injectable()
/**
 * Only allow users with a valid API key to access the protected route.
 * The apiKey is passed in the Authorization header as a Bearer token.
 */
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(apiKey: string) {
    const user = await this.authService.validateUserByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
