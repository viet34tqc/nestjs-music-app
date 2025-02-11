import { DataSource, DataSourceOptions } from 'typeorm';
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
