import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';
import { switchMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MovieFromDb } from '@shared/types';
import { mapMovieFromDbToMovie } from '@shared/helpers/convert-movie-type';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCreateComponent {
  movieForm: FormGroup;
  tags: string[] = [];
  suggestions: MovieFromDb[] = [];
  id: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: [''],
      releaseDate: [''],
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movieData = { ...this.movieForm.value, tags: this.tags };
      this.moviesService
        .createMovie(movieData)
        .pipe(
          switchMap(data => {
            this.id = data.id;
            return this.moviesService.getMovieInfo(data.title);
          })
        )
        .subscribe(data => {
          this.suggestions = data;
          this.cdr.detectChanges();
          // this.router.navigate(['/admin/dashboard']);
          // Navigate to the movie list or display a success message
        });
    }
  }

  useSuggestion(movie: MovieFromDb) {
    this.moviesService
      .updateMovie(mapMovieFromDbToMovie(movie), this.id!)
      .subscribe(() => {
        this.router.navigate(['/admin/dashboard']);
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
