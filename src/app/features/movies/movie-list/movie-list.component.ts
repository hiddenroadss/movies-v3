import { Component } from '@angular/core';
import { MoviesService } from '@core/services/api/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies$ = this.movieService.getMovies();

  constructor(private movieService: MoviesService) {}
}
