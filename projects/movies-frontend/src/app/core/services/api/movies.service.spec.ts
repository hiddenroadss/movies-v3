import { HttpTestingController } from '@angular/common/http/testing';
import {
  createHttpFactory,
  createServiceFactory,
  HttpMethod,
  SpectatorHttp,
  SpectatorService,
} from '@ngneat/spectator';
import { MoviesService } from './movies.service';
import { moviesStub } from 'src/app/testing/stubs/movies';
import { movieFromDbStub } from 'src/app/testing/stubs/movie-from-db';

describe('MoviesService', () => {
  let spectator: SpectatorHttp<MoviesService>;

  const createHttp = createHttpFactory({
    service: MoviesService,
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get movies', () => {
    const movies = moviesStub;

    spectator.service.getMovies().subscribe(data => {
      expect(data).toEqual(movies);
    });

    spectator.expectOne('http://localhost:3000/movies', HttpMethod.GET);
  });

  it('should get a movie by id', () => {
    const movie = moviesStub[0];

    spectator.service.getMovieById(1).subscribe(data => {
      expect(data).toEqual(movie);
    });

    spectator.expectOne('http://localhost:3000/movies/1', HttpMethod.GET);
  });

  it('should add a movie', () => {
    const movie = moviesStub[0];

    spectator.service.createMovie(movie).subscribe(data => {
      expect(data).toEqual(movie);
    });

    spectator.expectOne('http://localhost:3000/movies', HttpMethod.POST);
  });

  it('should update a movie', () => {
    const movie = moviesStub[0];

    spectator.service.updateMovie(movie, movie.id).subscribe(data => {
      expect(data).toEqual(movie);
    });

    spectator.expectOne('http://localhost:3000/movies/1', HttpMethod.PATCH);
  });

  it('should delete a movie', () => {
    spectator.service.deleteMovie(1).subscribe();

    spectator.expectOne('http://localhost:3000/movies/1', HttpMethod.DELETE);
  });

  it('should get movie info by title', () => {
    const title = 'The Shawshank Redemption';
    const movieFromDb = [movieFromDbStub];

    spectator.service.getMovieInfo(title).subscribe(data => {
      expect(data).toEqual(movieFromDb);
    });

    spectator.expectOne(
      `http://localhost:3000/movies/find/${title}`,
      HttpMethod.GET
    );
  });

  it('should add movies', () => {
    const movies = moviesStub.map(movie => ({ title: movie.title }));

    spectator.service.addMovies(movies).subscribe(data => {
      expect(data).toEqual(moviesStub);
    });

    spectator.expectOne(`http://localhost:3000/movies/bulk`, HttpMethod.POST);
  });
});
