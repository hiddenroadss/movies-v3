import { Tag } from './tag.type';

export type Movie = {
  id: number;
  title: string;
  director: string;
  releaseDate: string;
  tags: Tag[];
  poster: string;
};
