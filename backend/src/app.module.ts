import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { RedisModule } from './redis/redis.module';
import { ModulesModule } from './modules/modules.module';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    HealthModule,
    RedisModule,
    MinioModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
