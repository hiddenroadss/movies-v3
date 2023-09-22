import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MovieDashboardComponent } from './movie-dashboard.component';
import { MoviesService } from '@core/services/api/movies.service';
import { of } from 'rxjs';

describe('MovieDashboardComponent', () => {
  let spectator: Spectator<MovieDashboardComponent>;

  const createComponent = createComponentFactory({
    component: MovieDashboardComponent,
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
