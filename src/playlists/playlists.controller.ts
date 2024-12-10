import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playListService: PlaylistsService) {}

  @Post()
  create(@Body() createPlayListDto: CreatePlayListDto) {
    return this.playListService.create(createPlayListDto);
  }
}
