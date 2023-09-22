import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MovieBulkAddComponent } from './movie-bulk-add.component';
import { MoviesService } from '@core/services/api/movies.service';

describe('MovieBulkAddComponent', () => {
  let spectator: Spectator<MovieBulkAddComponent>;

  const createComponent = createComponentFactory({
    component: MovieBulkAddComponent,
    mocks: [MoviesService],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  // it('should add movies', () => {
  //   spectator.typeInElement('Movie 1\nMovie 2', 'textarea');
  //   spectator.click('button');
  //   expect(spectator.component.movieTitles).toBe('');
  // });

  // it('should ignore empty lines and trim titles', () => {
  //   spectator.typeInElement('  Movie 1  \n\nMovie 2\n', 'textarea');
  //   spectator.click('button');
  //   expect(spectator.component.movieTitles).toBe('');
  // });

  // it('should ignore quoted titles', () => {
  //   spectator.typeInElement('"Movie 1", "Movie 2"', 'textarea');
  //   spectator.click('button');
  //   expect(spectator.component.movieTitles).toBe('');
  // });
});
