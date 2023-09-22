import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MovieListComponent } from './movie-list.component';
import { MoviesService } from '@core/services/api/movies.service';
import { of } from 'rxjs';

describe('MovieListComponent', () => {
  let spectator: Spectator<MovieListComponent>;

  const createComponent = createComponentFactory({
    component: MovieListComponent,
    providers: [
      { provide: MoviesService, useValue: { getMovies: () => of([]) } },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
