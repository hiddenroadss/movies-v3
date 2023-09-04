import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import {
  MinLength,
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  director?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  releaseDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  tags?: Tag[];

  @ApiProperty({ required: false })
  @IsOptional()
  poster?: string;
}
