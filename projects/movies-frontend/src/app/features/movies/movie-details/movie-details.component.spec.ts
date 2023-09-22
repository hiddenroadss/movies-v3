import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MovieDetailsComponent } from './movie-details.component';
import { MoviesService } from '@core/services/api/movies.service';
import { ActivatedRoute } from '@angular/router';

describe('MovieDetailsComponent', () => {
  let spectator: Spectator<MovieDetailsComponent>;

  const createComponent = createComponentFactory({
    component: MovieDetailsComponent,
    mocks: [MoviesService],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              id: '1',
            },
          },
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
