import { of } from 'rxjs';
import { MoviesService } from '@core/services/api/movies.service';
import { MovieListComponent } from './movie-list.component';
import { moviesStub } from 'src/app/testing/stubs/movies';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

describe('MovieListComponent', () => {
  let spectator: Spectator<MovieListComponent>;
  let moviesService: MoviesService;

  const createComponent = createComponentFactory({
    component: MovieListComponent,
    providers: [
      {
        provide: MoviesService,
        useValue: {
          getMovies: () => of(moviesStub),
        },
      },
      {
        provide: ActivatedRoute,
        useValue: {},
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    moviesService = spectator.inject(MoviesService);
  });

  it('should display the movies from the service', () => {
    const movieCards = spectator.queryAll('[data-test="movie-card"]');
    expect(movieCards).toBeTruthy();
    expect(movieCards.length).toEqual(moviesStub.length);

    moviesStub.forEach((movie, index) => {
      const titleElem = movieCards[index]?.querySelector(
        '[data-test="movie-title"]'
      );
      const directorElem = movieCards[index]?.querySelector(
        '[data-test="movie-director"]'
      );
      const releaseDateElem = movieCards[index]?.querySelector(
        '[data-test="movie-release-date"]'
      );
      expect(titleElem?.textContent?.trim()).toEqual(movie.title);
      expect(directorElem?.textContent?.trim()).toEqual(
        `Directed by: ${movie.director}`
      );
      expect(releaseDateElem?.textContent?.trim()).toEqual(
        `Release Date: ${movie.releaseDate}`
      );
    });
  });

  it('should filter movies by tag', () => {
    spectator.typeInElement('drama', '[data-test="tag-filter"]');
    const movieCards = spectator.queryAll('[data-test="movie-card"]');
    const filteredMovies = moviesStub.filter(movie =>
      movie.tags.some(tag => tag.name.toLowerCase().includes('drama'))
    );
    expect(movieCards.length).toEqual(filteredMovies.length);
  });

  //TODO: fix this test
  it('should paginate movies correctly', () => {
    spyOn(moviesService, 'getMovies').and.returnValue(
      of([...moviesStub, ...moviesStub, ...moviesStub])
    );
    const totalMovies = moviesStub.length;
    const paginator = spectator.query('mat-paginator');
    expect(paginator).toBeTruthy();

    const displayedMovieCount = spectator.queryAll(
      '[data-test="movie-card"]'
    ).length;
    expect(displayedMovieCount).toEqual(spectator.component.pageSize);

    spectator.component.onPageChange({
      pageIndex: 1,
      pageSize: spectator.component.pageSize,
    } as PageEvent);
    const newDisplayedMovieCount = spectator.queryAll(
      '[data-test="movie-card"]'
    ).length;
    expect(newDisplayedMovieCount).toEqual(totalMovies - displayedMovieCount);
  });
});
