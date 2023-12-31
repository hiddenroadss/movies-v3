import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesService } from '@core/services/api/movies.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  iif
} from 'rxjs';
import { Movie, MovieFromDb, Tag } from '@shared/types';
import { MaterialModule } from '@shared/material.module';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '@shared/components/image-upload/image-upload.component';
import { Router } from '@angular/router';
import { createFileFromBlob } from '@shared/helpers/create-file-from-blob';
import { ButtonModule, FormFieldModule } from 'projects/ui-components/src/public-api';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    ImageUploadComponent,
    FormFieldModule, 
    ButtonModule
  ],
})
export class MovieCreateComponent implements OnInit {
  movieForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    director: new FormControl('', { nonNullable: true }),
    releaseDate: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
  });
  tags: Tag[] = [];
  suggestions$!: Observable<MovieFromDb[]>;
  id: number | undefined;
  posterControl = new FormControl<File | null>(null)

  constructor(private moviesService: MoviesService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.suggestions$ = this.movieForm.controls.title.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(title => this.moviesService.getMovieInfo(title))
    );
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      return;
    }
    const movieData: Partial<Movie> = {
      ...this.movieForm.getRawValue(),
      tags: this.tags,
      releaseDate: new Date(this.movieForm.controls.releaseDate.value),
    };

    const posterUpload$ = iif(() => !!this.posterControl.value, this.moviesService
    .uploadPoster(this.posterControl.value!), of(null))

    posterUpload$.pipe(
      switchMap(poster => {
        const movieDataWithPoster = poster
          ? { ...movieData, poster: poster.file }
          : movieData;
        return this.moviesService.createMovie(movieDataWithPoster);
      })
    ).subscribe(() => {
      this.router.navigate(['/admin/dashboard']);
    });
  }

  useSuggestion(movie: MovieFromDb) {
    this.moviesService.findPoster(movie.poster_path).subscribe(poster => {
      const newFile = createFileFromBlob(poster, movie)
      this.posterControl.setValue(newFile);
      this.movieForm.patchValue({
        title: movie.title,
        releaseDate: movie.release_date,
        description: movie.overview,
      });
    });
  }
}
