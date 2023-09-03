import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '@shared/types';

@Component({
  selector: 'app-edit-movie-dialog',
  templateUrl: './edit-movie-dialog.component.html',
  styleUrls: ['./edit-movie-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMovieDialogComponent {
  editMovieForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie,
    private fb: FormBuilder
  ) {
    //TODO: add typings
    this.editMovieForm = this.fb.group({
      title: [movie.title, Validators.required],
      director: [movie.director, Validators.required],
      releaseDate: [movie.releaseDate, Validators.required],
      rating: [
        movie.rating,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editMovieForm.valid) {
      const updatedMovieData = this.editMovieForm.value;
      // Update the movie with the new data from the form
      // and refresh the movie list
      this.dialogRef.close({
        id: this.movie.id,
        ...updatedMovieData,
      });
    }
  }
}
