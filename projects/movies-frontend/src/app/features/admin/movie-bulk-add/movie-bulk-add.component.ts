import { Component } from '@angular/core';
import { MoviesService } from '@core/services/api/movies.service';
import { Movie } from '@shared/types';

@Component({
  selector: 'app-movie-bulk-add',
  templateUrl: './movie-bulk-add.component.html',
  styleUrls: ['./movie-bulk-add.component.scss'],
})
export class MovieBulkAddComponent {
  movieTitles = '';

  constructor(private movieService: MoviesService) {}

  addMovies(): void {
    const titles = this.movieTitles
      .split('\n')
      .filter(title => title.trim().length > 0);
    const movies: Movie[] = titles.map(title => ({ title }) as Movie);
    this.movieService.addMovies(movies).subscribe(() => {
      alert('Movies added successfully');
      this.movieTitles = '';
    });
  }
}