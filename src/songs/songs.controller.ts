import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateSongDTO } from './dtos/create-song.dto';
import { SongEntity } from './songs.entity';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() createSongDTO: CreateSongDTO): Promise<SongEntity> {
    return this.songsService.create(createSongDTO);
  }
  @Get()
  findAll(
    @Param('id', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Param('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 1,
  ): Promise<Pagination<SongEntity>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.songsService.paginate({ page, limit });
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: SongEntity['id'],
  ) {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: SongEntity['id'],
    @Body() updateSongDTO: CreateSongDTO,
  ) {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: SongEntity['id']) {
    return this.songsService.delete(id);
  }
}
