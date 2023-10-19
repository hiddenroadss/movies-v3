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

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  getMovieInfo(title: string) {
    return this.http.get<MovieFromDb[]>(`${this.apiUrl}/find/${title}`);
  }

  getMovieInfoFirst(title: string) {
    return this.http.get<MovieFromDb>(
      `${this.apiUrl}/find/${title}?takeFirstOnly=true`
    );
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

  addMovies(movies: Pick<Movie, 'title'>[]): Observable<Movie[]> {
    return this.http.post<Movie[]>(this.apiUrl + '/bulk', movies);
  }

  uploadPoster(poster: File): Observable<{ file: string }> {
    const formData = new FormData();
    formData.append('poster', poster);

    return this.http.post<{ file: string }>(
      'http://localhost:3000/movies/poster/upload',
      formData
    );
  }

  findPoster(relativePath: string): Observable<Blob> {
    return this.http.get<Blob>(
      `https://image.tmdb.org/t/p/w500${relativePath}`,
      { responseType: 'blob' as 'json' }
    );
  }
}
