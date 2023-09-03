import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '@shared/types';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getMovies(options?: { page: number }): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl, {
      params: options,
    });
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.patch<Movie>(`${this.apiUrl}/${movie.id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addMovies(movies: Movie[]): Observable<Pick<Movie, 'title'>[]> {
    return this.http.post<Pick<Movie, 'title'>[]>(
      this.apiUrl + '/bulk',
      movies
    );
  }
}
