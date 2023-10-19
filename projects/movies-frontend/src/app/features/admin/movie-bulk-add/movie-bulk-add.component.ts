import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '@core/services/api/movies.service';
import { MaterialModule } from '@shared/material.module';
import { Movie, MovieFromDb } from '@shared/types';
import {
  Observable,
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
  imports: [FormsModule, MaterialModule, CommonModule],
})
export class MovieBulkAddComponent {
  movieTitles = '';
  recommendations$: Observable<[MovieFromDb, string][]> | undefined;

  constructor(private movieService: MoviesService) {}

  addMovies(): void {
    const titles = this.movieTitles
      .split(/[\n,]+/)
      .map(title => title.trim().replace(/(^["']|["']$)/g, ''))
      .filter(title => title.length > 0);

    if (titles.length === 0) {
      this.movieTitles = '';
      return;
    }
    const movies: Pick<Movie, 'title'>[] = titles.map(title => ({ title }));
    this.recommendations$ = from(movies).pipe(
      concatMap(movie =>
        this.movieService
          .getMovieInfoFirst(movie.title)
          .pipe(
            switchMap(movie =>
              forkJoin([
                of(movie),
                this.movieService
                  .findPoster(movie.poster_path)
                  .pipe(map(blob => URL.createObjectURL(blob))),
              ])
            )
          )
      ),
      toArray()
    );
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
}
