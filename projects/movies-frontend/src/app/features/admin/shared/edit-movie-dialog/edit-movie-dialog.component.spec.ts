// edit-movie-dialog.component.spec.ts

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditMovieDialogComponent } from './edit-movie-dialog.component';
import { MaterialModule } from '@shared/material.module';
import { Movie } from '@shared/types';

const TEST_MOVIE: Movie = {
  id: 1,
  title: 'Test Movie',
  director: 'John Doe',
  releaseDate: new Date('2020-01-01'),
  description: 'Test Description',
  tags: [
    { name: 'Tag 1', id: 1 },
    { name: 'Tag 2', id: 2 },
  ],
  poster: 'test-poster.jpg',
};

describe('EditMovieDialogComponent', () => {
  let spectator: Spectator<EditMovieDialogComponent>;
  const dialogRefMock = { close: jasmine.createSpy('close') };

  const createComponent = createComponentFactory({
    component: EditMovieDialogComponent,
    imports: [MaterialModule, ReactiveFormsModule],
    providers: [
      { provide: MatDialogRef, useValue: dialogRefMock },
      { provide: MAT_DIALOG_DATA, useValue: TEST_MOVIE },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  // it('should initialize the form with movie data', () => {
  //   const form = spectator.component.editMovieForm;

  //   expect(form.get('title')?.value).toBe(TEST_MOVIE.title);
  //   expect(form.get('director')?.value).toBe(TEST_MOVIE.director);
  //   expect(form.get('releaseDate')?.value).toEqual(TEST_MOVIE.releaseDate);
  //   expect(form.get('tags')?.value).toBe('Tag 1, Tag 2');
  // });

  // it('should close the dialog when cancel button is clicked', () => {
  //   spectator.click('button.cancel-button');
  //   expect(dialogRefMock.close).toHaveBeenCalled();
  // });

  // it('should emit the updated movie data and close the dialog when save button is clicked', () => {
  //   const newTitle = 'New Test Movie';
  //   spectator.component.editMovieForm.patchValue({ title: newTitle });

  //   spectator.click('button.save-button');

  //   expect(dialogRefMock.close).toHaveBeenCalledWith({
  //     id: TEST_MOVIE.id,
  //     title: newTitle,
  //     director: TEST_MOVIE.director,
  //     releaseDate: TEST_MOVIE.releaseDate,
  //     tags: TEST_MOVIE.tags.map(tag => tag.name),
  //   });
  // });

  // it('should not emit updated data or close the dialog with invalid form data', () => {
  //   spectator.component.editMovieForm.patchValue({ title: '' });

  //   spectator.click('button.save-button');

  //   expect(dialogRefMock.close).not.toHaveBeenCalled();
  // });
});
