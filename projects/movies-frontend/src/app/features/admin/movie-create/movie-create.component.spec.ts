import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MovieCreateComponent } from './movie-create.component';
import { MoviesService } from '@core/services/api/movies.service';

describe('MovieCreateComponent', () => {
  let spectator: Spectator<MovieCreateComponent>;

  const createComponent = createComponentFactory({
    component: MovieCreateComponent,
    mocks: [MoviesService],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
