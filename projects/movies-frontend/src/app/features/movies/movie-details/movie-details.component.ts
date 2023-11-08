import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';
import { ReviewService } from '@core/services/api/review.service';
import { ButtonModule, FormFieldModule } from 'projects/ui-components/src/public-api';
import { defer } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldModule, ButtonModule],
})
export class MovieDetailsComponent {
  movie$ = this.moviesService.getMovieById(
    Number(this.route.snapshot.params['id'])
  );
  reviews$ = defer(() =>
    this.reviewService.getReviewsByMovie(this.route.snapshot.params['id'])
  );

  reviewForm = new FormGroup({
    title:  new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2)]}),
    body: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(20)]}),
    rating: new FormControl(0, {nonNullable: true, validators: [Validators.required]}),
  });

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  addReview() {
    //TODO: Reload the list of reviews after adding
    this.reviewService
      .addReview(this.reviewForm.value, Number(this.route.snapshot.params['id']))
      .subscribe(() => {
        this.reviewForm.reset()
      });
  }
}
