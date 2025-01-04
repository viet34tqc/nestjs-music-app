import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// This guard is used to protect routes that only artists can access.
@Injectable()
export class JWTArtistGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  // When you apply the JWTArtistGuard at the controller function it will call the handleRequest function;
  handleRequest(err: any, user: any) {
    console.log('user', user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // If user, return user to the controller
    if (user.artistId) {
      return user;
    }
    // Else, throw error, preventing the user from accessing the route this guard protects
    throw err || new UnauthorizedException();
  }
}
