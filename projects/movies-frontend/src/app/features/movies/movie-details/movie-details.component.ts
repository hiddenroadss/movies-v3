import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  movie$ = this.moviesService.getMovie(
    Number(this.route.snapshot.params['id'])
  );
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}
}
