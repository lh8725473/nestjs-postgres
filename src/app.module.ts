import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import envConfig from '../config/config';

@Module({
  imports: [
    CatModule,
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // 数据库类型
        entities: ['dist/**/*.entity{.ts,.js}'], // 数据表实体
        // entities: [], // 数据表实体
        host: configService.get('DB_HOST', '172.30.8.40'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 5432), // 端口号
        username: configService.get('DB_USER', 'postgres'), // 用户名
        password: configService.get('DB_PASSWORD', 'GT_vI82XK6eU3os'), // 密码
        database: configService.get('DB_DATABASE', 'zyzl_jgpt'), // 数据库名
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: true, // 根据实体自动创建数据库表， 生产环境建议关闭
        logging: true, // 是否打印sql日志
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
