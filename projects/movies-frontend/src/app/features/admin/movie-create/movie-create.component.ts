import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  switchMap,
} from 'rxjs';
import { Movie, MovieFromDb, Tag } from '@shared/types';
import { MaterialModule } from '@shared/material.module';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '@shared/components/image-upload/image-upload.component';
import { HttpEventType } from '@angular/common/http';

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
  posterFile: File | null = null;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.suggestions$ = this.movieForm.controls.title.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(title => this.moviesService.getMovieInfo(title))
    );
  }

  onImageSelected(file: File) {
    this.posterFile = file;
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movieData: Partial<Movie> = {
        ...this.movieForm.getRawValue(),
        tags: this.tags,
        releaseDate: new Date(this.movieForm.controls.releaseDate.value),
      };

      if (this.posterFile) {
        // Upload the image
        this.moviesService
          .uploadPoster(this.posterFile)
          .pipe(
            switchMap(poster => {
              return this.moviesService.createMovie({
                ...movieData,
                poster: poster.file,
              });
            })
          )
          .subscribe(data => {
            // this.router.navigate(['/admin/dashboard']);
            // Navigate to the movie list or display a success message
          });
      } else {
        // Call createMovie without uploading a poster
        this.moviesService.createMovie(movieData).subscribe(data => {
          // this.router.navigate(['/admin/dashboard']);
          // Navigate to the movie list or display a success message
        });
      }
    }
  }

  useSuggestion(movie: MovieFromDb) {
    this.moviesService.findPoster(movie.poster_path).subscribe(poster => {
      const newFile = new File(
        [poster],
        `${movie.poster_path.split('/').at(-1)}`,
        {
          type: poster.type,
        }
      );
      this.onImageSelected(newFile);
      this.movieForm.patchValue({
        title: movie.title,
        releaseDate: movie.release_date,
        description: movie.overview,
      });
    });
  }
}
