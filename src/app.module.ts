import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST', 'localhost'),
        port: configService.get<number>('PG_PORT', 5432),
        username: configService.get<string>('PG_USER', 'postgres'),
        database: configService.get<string>('PG_DB', 'postgres'),
        password: configService.get<string>('PG_PSWD', 'docker'),
        entities: [`${__dirname}/db/entity/*{.ts,.js}`],
        synchronize: true,
      }),
    }),
    ProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
