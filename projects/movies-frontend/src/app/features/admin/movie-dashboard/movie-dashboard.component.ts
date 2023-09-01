import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoviesService } from '@core/services/api/movies.service';
import { Movie } from '@shared/types';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDashboardComponent {
  movies$ = this.movieService.getMovies();
  displayedColumns: string[] = [
    'title',
    'director',
    'releaseDate',
    'rating',
    'poster',
    'actions',
  ];

  constructor(private movieService: MoviesService) {}

  editMovie(movie: Movie): void {
    // Implement the edit functionality here
  }

  deleteMovie(movieId: number): void {
    // Implement the delete functionality here
  }
}
