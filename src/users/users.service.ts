import {
  ClassSerializerInterceptor,
  ForbiddenException,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from '@node-rs/argon2';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userDto: CreateUserDto) {
    // generate password hash
    const hash = await argon2.hash(userDto.password);

    try {
      // create new user
      const user = await this.usersRepository.save({
        ...userDto,
        apiKey: uuid4(),
        password: hash,
      });

      delete user.password;

      // save user to db
      return user;
    } catch (error) {
      // duplicate email error from Postgres
      if (error.code === '23505') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    // If user doesn't exist throw exception
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    return user;
  }

  async findByApiKey(apiKey: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ apiKey });
  }
}
