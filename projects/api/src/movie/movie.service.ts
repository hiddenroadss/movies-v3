import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async createBulk(createMovieDtos: CreateMovieDto[]) {
    return Promise.all(
      createMovieDtos.map((movie) => this.prisma.movie.create({ data: movie })),
    );
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
