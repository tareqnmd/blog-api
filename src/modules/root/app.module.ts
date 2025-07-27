import { Module } from '@nestjs/common';
import { BlogsModule } from '../blogs/blogs.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
