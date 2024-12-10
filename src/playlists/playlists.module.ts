import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from 'src/songs/song.entity';
import { UserEntity } from 'src/users/user.entity';
import { PlaylistEntity } from './playlist.entity';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity, SongEntity, UserEntity])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
