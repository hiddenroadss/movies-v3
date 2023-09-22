import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { VisualComponent } from './visual.component';
import { MoviesService } from '@core/services/api/movies.service';
import { of } from 'rxjs';

describe('VisualComponent', () => {
  let spectator: Spectator<VisualComponent>;

  const createComponent = createComponentFactory({
    component: VisualComponent,
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
