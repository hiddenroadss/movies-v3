import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from '@core/services/api/movies.service';
import { MaterialModule } from '@shared/material.module';
import { Movie, MovieFromDb } from '@shared/types';
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  forkJoin,
  from,
  map,
  of,
  share,
  switchMap,
  tap,
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
  recommendations: {movies: MovieFromDb[]; selected: MovieFromDb; selectedPoster: string}[] | undefined;
  suggestions: MovieFromDb[] | null = null;

  constructor(private movieService: MoviesService, private cdr: ChangeDetectorRef) {}

  addMovies(): void {
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
                  .pipe(map(blob => URL.createObjectURL(blob)), catchError(() => EMPTY)),
              ]).pipe(
                map(([movies, selected, selectedPoster]) => ({
                  movies,
                  selected,
                  selectedPoster
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
    // this.movieService.addMovies(movies).subscribe(() => {
    //   this.movieTitles = '';
    // });
    // this.moviesService.findPoster(movie.poster_path).subscribe(poster => {
    //   const newFile = new File(
    //     [poster],
    //     `${movie.poster_path.split('/').at(-1)}`,
    //     {
    //       type: poster.type,
    //     }
    //   );
    //   this.onImageSelected(newFile);
    //   this.movieForm.patchValue({
    //     title: movie.title,
    //     releaseDate: movie.release_date,
    //     description: movie.overview,
    //   });
    // });
  }

  useSuggestion(updatedMovie: MovieFromDb, oldMovie: MovieFromDb) {
    this.movieService.findPoster(updatedMovie.poster_path).subscribe(blob => {
      const url = URL.createObjectURL(blob)
      const index = this.recommendations!.findIndex(recc => recc.selected === oldMovie);
      this.recommendations?.splice(index, 1, {...this.recommendations[index], selected: updatedMovie, selectedPoster: url})
      this.cdr.detectChanges();
    });
  }

  closeMenu() {
    this.suggestions = null;
  }

  openMenu(movie: {movies: MovieFromDb[]; selected: MovieFromDb; selectedPoster: string}) {
    this.suggestions = movie.movies;
  }
}
