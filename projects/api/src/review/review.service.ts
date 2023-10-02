import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  create(movieId: number, createReviewDto: Omit<CreateReviewDto, 'movieId'>) {
    return this.prisma.review.create({
      data: {
        ...createReviewDto,
        movie: {
          connect: { id: movieId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.review.findMany({ include: { movie: true } });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: { movie: true },
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({ where: { id }, data: updateReviewDto });
  }

  remove(id: number) {
    return this.prisma.review.delete({ where: { id } });
  }
}
