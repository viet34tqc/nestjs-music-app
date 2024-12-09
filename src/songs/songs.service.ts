import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './dtos/create-song.dto';
import { SongEntity } from './songs.entity';

@Injectable()
export class SongsService {
  constructor(
    // Inject song repository into songs service
    // SongRepository provides CRUD methods to create, delete, update, and fetch records from the Songs table
    @InjectRepository(SongEntity)
    private songsRepository: Repository<SongEntity>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<SongEntity> {
    const song = new SongEntity();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return this.songsRepository.save(song);
  }

  findAll() {
    return this.songsRepository.find();
  }

  findOne(id: SongEntity['id']) {
    return this.songsRepository.findOneBy({ id });
  }

  delete(id: SongEntity['id']) {
    return this.songsRepository.delete(id);
  }

  update(id: SongEntity['id'], song: CreateSongDTO) {
    return this.songsRepository.update(id, song);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<SongEntity>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('song');
    queryBuilder.orderBy('song.releasedDate', 'DESC');
    return paginate<SongEntity>(queryBuilder, options);
  }
}
