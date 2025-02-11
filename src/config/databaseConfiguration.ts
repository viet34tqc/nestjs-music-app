export default () => ({
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
});
