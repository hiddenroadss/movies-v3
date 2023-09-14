import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieFromDb } from '@shared/types';

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

  getMovieInfo(title: string) {
    return this.http.get<MovieFromDb[]>(`${this.apiUrl}/find/${title}`);
  }

  createMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(movie: Partial<Movie>, id: number): Observable<Movie> {
    return this.http.patch<Movie>(`${this.apiUrl}/${id}`, movie);
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
