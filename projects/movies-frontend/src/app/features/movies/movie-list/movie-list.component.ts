import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MoviesService } from '@core/services/api/movies.service';
import { Movie } from '@shared/types';
import { combineLatest, defer, map, startWith } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  movies$ = this.movieService.getMovies();
  displayedMovies$ = defer(() =>
    combineLatest(
      this.movies$,
      this.tagFilterControl.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([movies, tagFilter]) => {
        if (!tagFilter) {
          return movies;
        }
        return movies.filter(movie =>
          movie.tags.some(tag =>
            tag.name.toLowerCase().includes(tagFilter.toLowerCase())
          )
        );
      }),
      map(movies => movies.slice(0, this.pageSize))
    )
  );
  pageSize = 10;
  tagFilterControl = new FormControl('');

  constructor(private movieService: MoviesService) {}

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedMovies$ = this.movies$.pipe(
      map(movies => movies.slice(startIndex, endIndex))
    );
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default_poster.jpg';
  }

  trackById(index: number, movie: Movie) {
    return movie.id;
  }
}
