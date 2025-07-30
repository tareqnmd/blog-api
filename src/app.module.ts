import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, BlogsModule, AuthModule],
})
export class AppModule {}
