import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MovieDashboardComponent } from './movie-dashboard.component';
import { MoviesService } from '@core/services/api/movies.service';
import { of } from 'rxjs';
import { moviesStub } from 'src/app/testing/stubs/movies';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { HarnessLoader } from '@angular/cdk/testing';

describe('MovieDashboardComponent', () => {
  let spectator: Spectator<MovieDashboardComponent>;
  let moviesService: MoviesService;
  let loader: HarnessLoader;

  const createComponent = createComponentFactory({
    component: MovieDashboardComponent,
    providers: [
      {
        provide: MoviesService,
        useValue: {
          getMovies: () => of([]),
          updateMovie: () => of({}),
          deleteMovie: () => of({}),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    moviesService = spectator.inject(MoviesService);
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
  });

  it('should initialize the table and paginator with movie data', async () => {
    spyOn(moviesService, 'getMovies').and.returnValue(of(moviesStub));
    spectator.component.reloadMovies$.next();
    const table = await loader.getHarness(MatTableHarness);
    const paginator = await loader.getHarness(MatPaginatorHarness);

    expect(table).toBeTruthy();
    const cellText = await table.getCellTextByColumnName();

    expect(cellText['title'].text).toEqual(
      moviesStub.map(movie => movie.title)
    );

    expect(paginator).toBeTruthy();
  });

  it('should open the dialog when the edit button is clicked and update movie data', async () => {
    spyOn(moviesService, 'getMovies').and.returnValue(of(moviesStub));
    spectator.component.reloadMovies$.next();
    const editButtons = await loader.getAllHarnesses(
      MatButtonHarness.with({ selector: '[data-test="edit-button"]' })
    );
    spyOn(spectator.component, 'editMovie').and.stub();

    await editButtons[0].click();

    expect(spectator.component.editMovie).toHaveBeenCalledOnceWith(
      moviesStub[0]
    );
  });

  it('should select a row when the checkbox is clicked', async () => {
    spyOn(moviesService, 'getMovies').and.returnValue(of(moviesStub));
    spectator.component.reloadMovies$.next();
    const checkboxes = await loader.getAllHarnesses(
      MatCheckboxHarness.with({ selector: '[data-test="select-checkbox"]' })
    );
    spyOn(spectator.component.selection, 'toggle').and.callThrough();
    await checkboxes[1].check();
    expect(spectator.component.selection.toggle).toHaveBeenCalledWith(
      moviesStub[1]
    );
  });

  it('should delete a single movie when the delete button is clicked', async () => {
    spyOn(moviesService, 'getMovies').and.returnValue(of(moviesStub));
    spectator.component.reloadMovies$.next();
    const checkboxes = await loader.getAllHarnesses(
      MatCheckboxHarness.with({ selector: '[data-test="select-checkbox"]' })
    );
    await checkboxes[2].check();
    const deleteButtons = await loader.getHarness(
      MatButtonHarness.with({ selector: '[data-test="delete-button"]' })
    );
    spyOn(spectator.component, 'deleteMovie').and.callThrough();
    await deleteButtons?.click();
    expect(spectator.component.deleteMovie).toHaveBeenCalled();
  });

  it('should check all rows when the select all checkbox is clicked', async () => {
    spyOn(moviesService, 'getMovies').and.returnValue(of(moviesStub));
    spectator.component.reloadMovies$.next();
    const selectAllCheckbox = await loader.getHarness(
      MatCheckboxHarness.with({ selector: '[data-test="select-all-checkbox"]' })
    );
    await selectAllCheckbox.check();
    expect(spectator.component.isAllSelected()).toBeTrue();
    const selectionLength = spectator.component.selection.selected.length;
    expect(selectionLength).toEqual(moviesStub.length);
  });

  it('should select and deselect all rows with toggleAllRows', () => {
    spyOn(moviesService, 'getMovies').and.returnValue(of(moviesStub));
    spectator.component.reloadMovies$.next();

    // Select all rows
    spectator.component.toggleAllRows();
    expect(spectator.component.isAllSelected()).toBeTrue();
    expect(spectator.component.selection.selected.length).toEqual(
      moviesStub.length
    );

    // Deselect all rows
    spectator.component.toggleAllRows();
    expect(spectator.component.isAllSelected()).toBeFalse();
    expect(spectator.component.selection.selected.length).toEqual(0);
  });

  // it('should properly update dataSource after deleting a single movie', async () => {
  //   spyOn(moviesService, 'getMovies').and.returnValue(of(moviesStub));
  //   spyOn(moviesService, 'deleteMovie').and.returnValue(of());
  //   spectator.component.reloadMovies$.next();

  //   const initialDataSourceLength = spectator.component.dataSource.data.length;

  //   const checkboxes = await loader.getAllHarnesses(
  //     MatCheckboxHarness.with({ selector: '[data-test="select-checkbox"]' })
  //   );
  //   await checkboxes[2].check();

  //   const deleteButton = await loader.getHarness(
  //     MatButtonHarness.with({ selector: '[data-test="delete-button"]' })
  //   );
  //   spyOn(spectator.component, 'deleteMovie').and.callThrough();
  //   await deleteButton.click();

  //   expect(spectator.component.deleteMovie).toHaveBeenCalled();
  //   expect(spectator.component.dataSource.data.length).toEqual(
  //     initialDataSourceLength - 1
  //   );
  // });
});
