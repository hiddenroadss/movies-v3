import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MoviesDbService } from './movies-db/movies-db.service';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import { MulterStorageConfig } from 'src/config/multer-storage.config';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MoviesDbService],
  imports: [
    PrismaModule,
    HttpModule,
    MulterModule.registerAsync({ useClass: MulterStorageConfig }),
  ],
})
export class MovieModule {}
