import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artists/artist.entity';
import { SongEntity } from './song.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  // Import typeorm repository
  imports: [TypeOrmModule.forFeature([SongEntity, ArtistEntity])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
