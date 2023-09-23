import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';
import { MaterialModule } from '@shared/material.module';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule],
})
export class MovieDetailsComponent {
  movie$ = this.moviesService.getMovieById(
    Number(this.route.snapshot.params['id'])
  );
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}
}
