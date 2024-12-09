import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistEntity } from './artists/artist.entity';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { SongEntity } from './songs/song.entity';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    SongsModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres@123',
      database: 'songs_db',
      entities: [SongEntity, ArtistEntity, UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
