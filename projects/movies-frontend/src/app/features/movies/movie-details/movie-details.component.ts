import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';
import { ReviewService } from '@core/services/api/review.service';
import { MaterialModule } from '@shared/material.module';
import { defer } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
})
export class MovieDetailsComponent {
  movie$ = this.moviesService.getMovieById(
    Number(this.route.snapshot.params['id'])
  );
  reviews$ = defer(() =>
    this.reviewService.getReviewsByMovie(this.route.snapshot.params['id'])
  );

  review = {
    title: '',
    body: '',
    rating: 0,
  };

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  addReview() {
    //TODO: Reload the list of reviews after adding
    this.reviewService
      .addReview(this.review, Number(this.route.snapshot.params['id']))
      .subscribe(() => {
        this.review = {
          title: '',
          body: '',
          rating: 0,
        };
      });
  }
}
