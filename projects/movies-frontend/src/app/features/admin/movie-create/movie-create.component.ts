import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MoviesService } from '@core/services/api/movies.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Movie, MovieFromDb, Tag } from '@shared/types';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.suggestions$ = this.movieForm.controls.title.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(title => this.moviesService.getMovieInfo(title))
    );
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movieData: Partial<Movie> = {
        ...this.movieForm.getRawValue(),
        tags: this.tags,
        releaseDate: new Date(this.movieForm.controls.releaseDate.value),
      };
      this.moviesService
        .createMovie(movieData)

        .subscribe(data => {
          // this.router.navigate(['/admin/dashboard']);
          // Navigate to the movie list or display a success message
        });
    }
  }

  useSuggestion(movie: MovieFromDb) {
    this.movieForm.setValue({
      ...this.movieForm.getRawValue(),
      title: movie.title,
      releaseDate: movie.release_date,
      description: movie.overview,
    });
  }
}
