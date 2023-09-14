import { Tag } from './tag.type';

export type Movie = {
  id: number;
  title: string;
  director: string;
  releaseDate: Date;
  tags: Tag[];
  description: string;
  poster: string;
};
