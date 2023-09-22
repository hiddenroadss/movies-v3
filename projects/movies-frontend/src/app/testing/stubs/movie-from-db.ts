import { MovieFromDb } from '@shared/types';

export const movieFromDbStub: MovieFromDb = {
  adult: false,
  backdrop_path: 'test',
  genre_ids: [1],
  id: 1,
  original_language: 'test',
  original_title: 'test',
  overview: 'test',
  popularity: 1,
  poster_path: 'test',
  release_date: new Date('2020-01-01').toISOString(),
  title: 'test',
  video: false,
  vote_average: 1,
  vote_count: 1,
};
