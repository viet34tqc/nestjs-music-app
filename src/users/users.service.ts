import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from '@node-rs/argon2';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(dto: CreateUserDto) {
    // generate password hash
    const hash = await argon2.hash(dto.password);

    try {
      // create new user
      const user = this.usersRepository.create({
        email: dto.email,
        password: hash,
      });

      // save user to db
      await this.usersRepository.save(user);

      // return saved user
      return user;
    } catch (error) {
      // duplicate email error from Postgres
      if (error.code === '23505') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }
}
