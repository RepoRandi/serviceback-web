import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth.module';

// Entities
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@entities/index';

// Routes
import { RouterModule } from 'nest-router';
import { routes, modules as AdminApiModules } from './routes';
import { AdminModule } from './api/admin/admin.module';
// HYGEN-IMPORT

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../env/.env.development.local',
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: (process.env.TYPEORM_PORT as unknown) as number,
      entities,
      keepConnectionAlive: true,
    }),
    RouterModule.forRoutes(routes),
    ...AdminApiModules,
    AdminModule,
  ], // HYGEN-IMPORTS
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
