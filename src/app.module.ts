import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AnimesModule } from './animes/animes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AnimesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
