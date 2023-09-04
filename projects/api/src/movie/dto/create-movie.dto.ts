import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsNotEmpty, IsOptional } from 'class-validator';

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
  @IsOptional()
  releaseDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  poster?: string;
}
