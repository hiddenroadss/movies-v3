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
import { MovieFromDb } from '@shared/types';

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
    originalLanguage: new FormControl('', { nonNullable: true }),
    originalTitle: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    popularity: new FormControl(0, { nonNullable: true }),
    voteAverage: new FormControl(0, { nonNullable: true }),
    voteCount: new FormControl(0, { nonNullable: true }),
  });
  tags: string[] = [];
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
      const movieData = { ...this.movieForm.value, tags: this.tags };
      this.moviesService
        .createMovie(movieData as any)

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
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      popularity: movie.popularity,
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
