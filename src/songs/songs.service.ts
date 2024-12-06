import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongEntity } from './songs.entity';

@Injectable()
export class SongsService {
  // local db
  // local array

  constructor(
    // Inject song repository into songs service
    // SongRepository provides CRUD methods to create, delete, update, and fetch records from the Songs table
    @InjectRepository(SongEntity)
    private songsRepository: Repository<SongEntity>,
  ) {}

  private readonly songs = [];

  create(song) {
    // Save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch the songs from the db
    // Errors comes while fetching the data from DB
    // throw new Error('Error in Db whil fetching record');
    return this.songs;
  }
}
