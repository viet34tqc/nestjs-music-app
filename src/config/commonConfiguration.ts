export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
});
