import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @ApiProperty({ required: false })
  director?: string;

  @ApiProperty({ required: false })
  @IsDate()
  releaseDate?: Date;

  @ApiProperty({ required: false })
  tags?: string[];

  @ApiProperty({ required: false })
  poster?: string;
}
