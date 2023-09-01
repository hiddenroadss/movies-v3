import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [MovieModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
