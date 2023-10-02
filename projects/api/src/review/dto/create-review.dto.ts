import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  body: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  movieId: number;
}
