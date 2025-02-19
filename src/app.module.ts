import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { LoggerModule } from './common/middleware/logger/logger.module';
import commonConfiguration from './config/commonConfiguration';
import databaseConfiguration from './config/databaseConfiguration';
import { typeOrmAsyncConfig } from './db/data-source';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';
import { validate } from '../env.validation';

@Module({
  imports: [
    SongsModule,
    LoggerModule,
    // forRoot setup global configuration
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    PlaylistsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
      validate,
      load: [commonConfiguration, databaseConfiguration],
    }),
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
