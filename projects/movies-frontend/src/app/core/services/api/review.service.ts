import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@shared/types/review.type';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  getReviews() {
    return this.http.get<Review[]>(this.apiUrl);
  }

  getReviewsByMovie(movieId: number) {
    return this.http.get<Review[]>(`${this.apiUrl}/by/${movieId}`);
  }

  getReview(id: number) {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  addReview(review: Partial<Review>, movieId: number) {
    return this.http.post<Review>(this.apiUrl, { ...review, movieId });
  }

  updateReview(review: Partial<Review>, id: number) {
    return this.http.patch<Review>(`${this.apiUrl}/${id}`, review);
  }

  deleteReview(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
