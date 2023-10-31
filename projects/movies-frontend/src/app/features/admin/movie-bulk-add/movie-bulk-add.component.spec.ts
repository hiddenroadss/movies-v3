import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MovieBulkAddComponent } from './movie-bulk-add.component';
import { MoviesService } from '@core/services/api/movies.service';
import { of } from 'rxjs';
import { movieStub } from 'src/app/testing/stubs/movies';

// describe('MovieBulkAddComponent', () => {
//   let spectator: Spectator<MovieBulkAddComponent>;
//   let moviesService: MoviesService;

//   const createComponent = createComponentFactory({
//     component: MovieBulkAddComponent,
//     providers: [
//       {
//         provide: MoviesService,
//         useValue: { addMovies: () => of([]) },
//       },
//     ],
//   });

//   beforeEach(() => {
//     spectator = createComponent();
//     moviesService = spectator.inject(MoviesService);
//   });

//   it('should add movies', () => {
//     const addMoviesSpy = spyOn(moviesService, 'addMovies').and.returnValue(
//       of([movieStub])
//     );
//     spectator.typeInElement('Movie 1\nMovie 2', 'textarea');
//     spectator.click('button');
//     expect(addMoviesSpy).toHaveBeenCalledWith([
//       { title: 'Movie 1' },
//       { title: 'Movie 2' },
//     ]);
//     expect(spectator.component.movieTitles).toBe('');
//   });

//   it('should ignore empty lines and trim titles', () => {
//     const addMoviesSpy = spyOn(moviesService, 'addMovies').and.returnValue(
//       of([movieStub])
//     );
//     spectator.typeInElement('  Movie 1  \n\nMovie 2\n', 'textarea');
//     spectator.click('button');
//     expect(addMoviesSpy).toHaveBeenCalledWith([
//       { title: 'Movie 1' },
//       { title: 'Movie 2' },
//     ]);
//     expect(spectator.component.movieTitles).toBe('');
//   });

//   it('should ignore quoted titles', () => {
//     const addMoviesSpy = spyOn(moviesService, 'addMovies').and.returnValue(
//       of([movieStub])
//     );
//     spectator.typeInElement('"Movie 1", "Movie 2"', 'textarea');
//     spectator.click('button');
//     expect(addMoviesSpy).toHaveBeenCalledWith([
//       { title: 'Movie 1' },
//       { title: 'Movie 2' },
//     ]);
//     expect(spectator.component.movieTitles).toBe('');
//   });

//   it('should not add movies if there are no titles', () => {
//     const addMoviesSpy = spyOn(moviesService, 'addMovies').and.returnValue(
//       of([movieStub])
//     );
//     spectator.typeInElement('\n', 'textarea');
//     spectator.click('button');
//     expect(addMoviesSpy).not.toHaveBeenCalled();
//     expect(spectator.component.movieTitles).toBe('');
//   });
// });
