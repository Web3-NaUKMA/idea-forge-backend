import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StartupModule } from './startup/startup.module';
import { entities } from './typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartupController } from './startup/controllers/startup.controller';
import { DocumentModule } from './document/document.module';
import { LLMModule } from './llm/llm.module';


@Module({

  imports: [
    AuthModule, UserModule, StartupModule, LLMModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: parseInt(process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: entities
    }), StartupModule, DocumentModule, LLMModule]
  ,
  controllers: [],
  providers: [],
})
export class AppModule { }
