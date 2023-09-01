import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  director?: string;

  @ApiProperty({ required: false })
  releaseDate?: Date;

  @ApiProperty({ required: false })
  rating?: number;

  @ApiProperty({ required: false })
  poster?: string;
}
