import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MoviesDbService } from './movies-db/movies-db.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MoviesDbService],
  imports: [PrismaModule, HttpModule],
})
export class MovieModule {}
