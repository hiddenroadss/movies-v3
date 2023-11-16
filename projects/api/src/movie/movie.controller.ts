import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { MoviesDbService } from './movies-db/movies-db.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
@ApiTags('Movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private moviesDbService: MoviesDbService
  ) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Post('bulk')
  createBulk(@Body() movieTitles: Pick<CreateMovieDto, 'title'>[]) {
    return this.movieService.createBulk(movieTitles);
  }

  @Get('find/:title')
  async findMovieInDb(
    @Param('title') movieTitle: string,
  ) {
    return this.moviesDbService.fetchMovieData(movieTitle);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }

  @Post('poster/upload')
  @UseInterceptors(FileInterceptor('poster'))
  async uploadPoster(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return new BadRequestException('No file was uploaded');
    }

    return {
      file: file.filename,
    };
  }
}
