import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let spectator: SpectatorService<MoviesService>;
  let httpMock: HttpTestingController;

  const createService = createServiceFactory({
    service: MoviesService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpMock = spectator.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  // it('should get movies', () => {
  //   const movies = [
  //     { id: 1, title: 'Movie 1' },
  //     { id: 2, title: 'Movie 2' },
  //   ];

  //   spectator.service.getMovies().subscribe(data => {
  //     expect(data).toEqual(movies);
  //   });

  //   const req = httpMock.expectOne('/api/movies');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(movies);
  // });

  // it('should get a movie by id', () => {
  //   const movie = { id: 1, title: 'Movie 1' };

  //   spectator.service.getMovieById(1).subscribe(data => {
  //     expect(data).toEqual(movie);
  //   });

  //   const req = httpMock.expectOne('/api/movies/1');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(movie);
  // });

  // it('should add a movie', () => {
  //   const movie = { title: 'Movie 1' };

  //   spectator.service.addMovie(movie).subscribe(data => {
  //     expect(data).toEqual(movie);
  //   });

  //   const req = httpMock.expectOne('/api/movies');
  //   expect(req.request.method).toBe('POST');
  //   req.flush(movie);
  // });

  // it('should update a movie', () => {
  //   const movie = { id: 1, title: 'Movie 1' };

  //   spectator.service.updateMovie(movie).subscribe(data => {
  //     expect(data).toEqual(movie);
  //   });

  //   const req = httpMock.expectOne('/api/movies/1');
  //   expect(req.request.method).toBe('PUT');
  //   req.flush(movie);
  // });

  // it('should delete a movie', () => {
  //   spectator.service.deleteMovie(1).subscribe();

  //   const req = httpMock.expectOne('/api/movies/1');
  //   expect(req.request.method).toBe('DELETE');
  //   req.flush({});
  // });
});
