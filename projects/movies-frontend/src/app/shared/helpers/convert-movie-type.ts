import { Movie, MovieFromDb } from '@shared/types';

export function mapMovieFromDbToMovie(
  movieFromDb: MovieFromDb
): Partial<Movie> {
  return {
    title: movieFromDb.title,
    director: '', // Set this to the appropriate value, as it's not available in MovieFromDb
    releaseDate: new Date(movieFromDb.release_date),
    poster: movieFromDb.poster_path,
  };
}

// function convertGenreIdsToTags(genreIds: number[]): Tag[] {
//   // Implement this function depending on how you want to convert genre_ids to tags
//   return genreIds.map(id => ({ name: `Tag ${id}` })); // This is a simple example, you may want to map ids to meaningful tag names
// }
