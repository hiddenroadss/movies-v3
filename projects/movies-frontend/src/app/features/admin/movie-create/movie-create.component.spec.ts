import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieCreateComponent } from './movie-create.component';
import { MoviesService } from '@core/services/api/movies.service';
import { of } from 'rxjs';
import { movieStub } from 'src/app/testing/stubs/movies';
import { movieFromDbStub } from 'src/app/testing/stubs/movie-from-db';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('MovieCreateComponent', () => {
  let spectator: Spectator<MovieCreateComponent>;
  let moviesService: MoviesService;

  const createComponent = createComponentFactory({
    component: MovieCreateComponent,
    imports: [ReactiveFormsModule],
    providers: [
      {
        provide: MoviesService,
        useValue: { createMovie: () => of([]), getMovieInfo: () => of([]) },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    moviesService = spectator.inject(MoviesService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should submit movie data', () => {
    const createMovieSpy = spyOn(moviesService, 'createMovie').and.returnValue(
      of(movieStub)
    );
    spectator.typeInElement('Movie Title', 'input[formControlName="title"]');
    spectator.typeInElement(
      'Director Name',
      'input[formControlName="director"]'
    );
    spectator.typeInElement(
      '2022-01-01',
      'input[formControlName="releaseDate"]'
    );
    spectator.typeInElement(
      'Movie Description',
      'textarea[formControlName="description"]'
    );
    spectator.click('button[type="submit"]');
    expect(createMovieSpy).toHaveBeenCalledWith({
      title: 'Movie Title',
      director: 'Director Name',
      releaseDate: new Date('2022-01-01'),
      description: 'Movie Description',
      tags: [],
    });
  });

  it('should use movie suggestion', async () => {
    const loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    const getMovieInfoSpy = spyOn(
      moviesService,
      'getMovieInfo'
    ).and.returnValue(of([movieFromDbStub]));
    spectator.typeInElement('test', 'input[formControlName="title"]');

    await spectator.fixture.whenStable();
    expect(getMovieInfoSpy).toHaveBeenCalled();
    const matAutocomplete = await loader.getHarness(MatAutocompleteHarness);
    const options = await matAutocomplete.getOptions();
    await options[0].click();
    expect(spectator.component.movieForm.getRawValue()).toEqual({
      title: movieFromDbStub.title,
      director: '',
      releaseDate: movieFromDbStub.release_date,
      description: movieFromDbStub.overview,
    });
  });

  it('should not submit invalid movie data', () => {
    const createMovieSpy = spyOn(moviesService, 'createMovie').and.returnValue(
      of(movieStub)
    );
    spectator.click('button[type="submit"]');
    expect(createMovieSpy).not.toHaveBeenCalled();
  });
});
