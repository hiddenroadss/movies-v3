import { Movie } from '@shared/types';

export const movieStub: Movie = {
  id: 1,
  title: 'test',
  director: 'test',
  releaseDate: new Date(),
  tags: [{ id: 1, name: 'test' }],
  description: 'test',
  poster: 'test',
};
