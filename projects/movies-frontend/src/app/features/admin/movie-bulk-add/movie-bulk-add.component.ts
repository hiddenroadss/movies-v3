import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';
import { mapMovieFromDbToMovie } from '@shared/helpers/convert-movie-type';
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
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
})
export class MovieBulkAddComponent {
  movieTitles =  new FormControl('', {nonNullable: true})
  recommendations: {movies: MovieFromDb[]; selected: MovieFromDb; selectedPosterUrl: string; selectedPosterBlob: Blob}[] | undefined;
  suggestions: MovieFromDb[] | null = null;

  constructor(private movieService: MoviesService, private cdr: ChangeDetectorRef, private router: Router) {}

  findSuggestions(): void {
    const titles = this.movieTitles.value
      .split(/[\n,]+/)
      .map(title => title.trim().replace(/(^["']|["']$)/g, ''))
      .filter(title => title.length > 0);

    if (titles.length === 0) {
      this.movieTitles.setValue('');
      return;
    }
    const movies: Pick<Movie, 'title'>[] = titles.map(title => ({ title }));
    from(movies).pipe(
      concatMap(movie =>
        this.movieService
          .getMovieInfo(movie.title)
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
      const index = this.recommendations!.findIndex(recc => recc.selected === oldMovie);
      this.recommendations?.splice(index, 1, {...this.recommendations[index], selected: updatedMovie, selectedPosterUrl: url, selectedPosterBlob: blob})
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
    const moviesAndPosters = this.recommendations!.map(({selected, selectedPosterBlob}) => ({selected, selectedPosterBlob}));
    from(moviesAndPosters).pipe(
      concatMap(({selected, selectedPosterBlob}) => {
        const file = new File( [selectedPosterBlob],
          `${selected.poster_path.split('/').at(-1)}`,
          {
            type: selectedPosterBlob.type,
          })
        return this.movieService.uploadPoster(file).pipe(
          concatMap(poster => {
            const mapped = mapMovieFromDbToMovie(selected);
            return this.movieService.createMovie({...mapped, poster: poster.file})
          })
        )
      }),
      toArray()
    ).subscribe(() => {
      this.movieTitles.setValue('');
      this.router.navigateByUrl('..')
    })
  }
}
