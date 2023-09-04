import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const { tags, ...movieWithoutTags } = createMovieDto;

    let existingTags = [];
    let newTags = [];

    if (tags) {
      // Fetch existing tags from the database
      existingTags = await this.prisma.tag.findMany({
        where: {
          name: {
            in: tags,
          },
        },
      });

      // Find the tags that don't exist in the database
      newTags = tags.filter(
        tagName => !existingTags.some(tag => tag.name === tagName)
      );
    }

    return this.prisma.movie.create({
      data: {
        ...movieWithoutTags,
        tags: tags
          ? {
              connect: existingTags.map(tag => ({ id: tag.id })),
              create: newTags.map(tagName => ({ name: tagName })),
            }
          : undefined,
      },
      include: { tags: true },
    });
  }

  async createBulk(createMovieDtos: Pick<CreateMovieDto, 'title'>[]) {
    return Promise.all(
      createMovieDtos.map(movie => this.prisma.movie.create({ data: movie }))
    );
  }

  findAll() {
    return this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        tags: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const { tags, ...movieWithoutTags } = updateMovieDto;

    let existingTags: Tag[] = [];
    let newTags: string[] = [];

    if (tags) {
      // Fetch existing tags from the database
      existingTags = await this.prisma.tag.findMany({
        where: {
          name: {
            in: tags,
          },
        },
      });

      // Find the tags that don't exist in the database
      newTags = tags.filter(
        tagName =>
          !existingTags.some(existingTag => existingTag.name === tagName)
      );
    }

    return this.prisma.movie.update({
      where: { id },
      data: {
        ...movieWithoutTags,
        tags: tags
          ? {
              set: [], // Remove all existing tags
              connect: existingTags.map(tag => ({ id: tag.id })),
              create: newTags.map(tag => ({ name: tag })),
            }
          : undefined,
      },
      include: {
        tags: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.movie.delete({ where: { id } });
  }
}
