import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    console.log("configService.get('dbName')", configService.get('dbName'));
    return {
      type: 'postgres',
      host: configService.get('dbHost'),
      port: configService.get('dbPort'),
      username: configService.get('username'),
      database: configService.get('dbName'),
      password: configService.get('password'),
      entities: ['dist/**/*.entity.js'], // No need to register the entity manually. TypeORM will find the entities by itself.
      synchronize: false, // If set to true, it will synchronize the database in production, which is not safe
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres@123',
  database: 'songs_db',
  entities: ['dist/**/*.entity.js'], // No need to register the entity manually. TypeORM will find the entities by itself.
  synchronize: false, // If set to true, it will synchronize the database in production, which is not safe
  migrations: ['dist/db/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
