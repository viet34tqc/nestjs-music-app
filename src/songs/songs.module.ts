import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsController } from './songs.controller';
import { SongEntity } from './songs.entity';
import { SongsService } from './songs.service';

@Module({
  // Import typeorm repository
  imports: [TypeOrmModule.forFeature([SongEntity])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
