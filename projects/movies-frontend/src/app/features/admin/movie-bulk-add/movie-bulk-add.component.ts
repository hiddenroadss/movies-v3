import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { ButtonDirective } from '@shared/directives/button.directive';
import { InputDirective } from '@shared/directives/input.directive';
import { mapMovieFromDbToMovie } from '@shared/helpers/convert-movie-type';
import { createFileFromBlob } from '@shared/helpers/create-file-from-blob';
import { extractTitles } from '@shared/helpers/extract-titles';
import { MaterialModule } from '@shared/material.module';
import { Movie, MovieFromDb } from '@shared/types';
import {
  concatMap,
  forkJoin,
  from,
  map,
  of,
  switchMap,
  toArray,
} from 'rxjs';

@Component({
  selector: 'app-movie-bulk-add',
  templateUrl: './movie-bulk-add.component.html',
  styleUrls: ['./movie-bulk-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule, InputDirective, ButtonDirective, InputErrorsComponent],
})
export class MovieBulkAddComponent {
  movieTitlesControl =  new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2)]})
  recommendations: {movies: MovieFromDb[]; selected: MovieFromDb; selectedPosterUrl: string; selectedPosterBlob: Blob}[] | undefined;
  suggestions: MovieFromDb[] | null = null;

  constructor(private movieService: MoviesService, private cdr: ChangeDetectorRef, private router: Router) {}

  findSuggestions(): void {
    const titles = extractTitles(this.movieTitlesControl.value);

    if (titles.length === 0) {
      this.movieTitlesControl.setValue('');
      return;
    }
    from(titles).pipe(
      concatMap(title =>
       this._fetchMovieInfo(title)
      ),
      toArray(),
    ).subscribe(data => {
      this.recommendations = data;
      this.cdr.detectChanges();
    });
   
  }


  useSuggestion(updatedMovie: MovieFromDb, oldMovie: MovieFromDb) {
    this.movieService.findPoster(updatedMovie.poster_path).subscribe(blob => {
      const url = URL.createObjectURL(blob)
      this._updateRecommendations(oldMovie, updatedMovie, url, blob);
      this.cdr.detectChanges();
    });
  }

  closeMenu() {
    this.suggestions = null;
  }

  openMenu(movie: {movies: MovieFromDb[]; selected: MovieFromDb; selectedPosterUrl: string; selectedPosterBlob: Blob}) {
    this.suggestions = movie.movies;
  }

  addMovies() {
    if (!this.recommendations) {
      return;
    }
    from(this.recommendations).pipe(
      concatMap(({selected, selectedPosterBlob}) => this._uploadMovieWithPoster(selectedPosterBlob, selected)),
      toArray()
    ).subscribe(() => {
      this.movieTitlesControl.setValue('');
      this.router.navigateByUrl('..')
    })
  }

  private _fetchMovieInfo(title: string) {
    return  this.movieService
    .getMovieInfo(title)
    .pipe(
      switchMap(movies =>
        forkJoin([
          of(movies),
          of(movies[0]),
          this.movieService
            .findPoster(movies[0].poster_path)
           
        ]).pipe(
          map(([movies, selected, selectedPosterBlob]) => ({
            movies,
            selected,
            selectedPosterBlob,
            selectedPosterUrl: URL.createObjectURL(selectedPosterBlob)
          }))
        )
      )
    )
  }


  private _updateRecommendations(oldMovie: MovieFromDb, updatedMovie: MovieFromDb, url: string, blob: Blob) {
    const index = this.recommendations!.findIndex(recc => recc.selected === oldMovie);
    this.recommendations?.splice(index, 1, { ...this.recommendations[index], selected: updatedMovie, selectedPosterUrl: url, selectedPosterBlob: blob });
  }

  private _uploadMovieWithPoster(selectedPosterBlob: Blob, selected: MovieFromDb) {
    const file = createFileFromBlob(selectedPosterBlob, selected);
    const mapped = mapMovieFromDbToMovie(selected);

    return this.movieService.uploadPoster(file).pipe(
      concatMap(poster => {
        return this.movieService.createMovie({ ...mapped, poster: poster.file });
      })
    );
  }
}
