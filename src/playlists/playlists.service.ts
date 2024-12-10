import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity } from 'src/songs/song.entity';
import { UserEntity } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { PlaylistEntity } from './playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(playlistDto: CreatePlayListDto): Promise<PlaylistEntity> {
    const playlist = new PlaylistEntity();
    playlist.name = playlistDto.name;

    const songs = await this.songRepository.findBy({
      id: In(playlistDto.songs),
    });
    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playlistDto.user });
    playlist.user = user;
    return this.playlistRepository.save(playlist);
  }
}
