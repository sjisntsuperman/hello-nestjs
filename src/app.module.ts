import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
    }),
  ],
  controllers: [AppController, UserController, CommodityController],
  providers: [AppService, CommodityService],
})
export class AppModule {}
