export const appConfig = () => ({
  environment: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
    autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true' || false,
  },
});
