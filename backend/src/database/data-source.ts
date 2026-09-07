import 'tsconfig-paths/register';
import dotenv from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';

dotenv.config();

// type PostgresSslConfig = boolean | { rejectUnauthorized: boolean };

// const getSslConfig = (): PostgresSslConfig => {
//   if (process.env.TYPEORM_SSL === 'false') {
//     return false;
//   }

//   if (
//     process.env.TYPEORM_SSL === 'true' ||
//     process.env.NODE_ENV === 'production'
//   ) {
//     return {
//       rejectUnauthorized:
//         process.env.TYPEORM_SSL_REJECT_UNAUTHORIZED === 'true',
//     };
//   }

//   return false;
// };

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  // extra: {
  //     options: '-c timezone=Asia/Phnom_Penh',
  // },
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/admin/*{.ts,.js}'],
  seeds: ['src/database/seeds/main.seed.ts'],
  logging: true,
  synchronize: false,
//   ssl: getSslConfig(),
};

export const AppDataSource = new DataSource(options);