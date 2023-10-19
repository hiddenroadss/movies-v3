import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, filter, map } from 'rxjs';

@Injectable()
export class MoviesDbService {
  private readonly API_KEY =
    this.configService.get<string>('MOVIES_DB_API_KEY');
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  fetchMovieData(title: string, takeFirstOnly = false): Observable<any> {
    return this.httpService
      .get(`${this.BASE_URL}/search/movie`, {
        params: {
          api_key: this.API_KEY,
          query: title,
        },
      })
      .pipe(
        filter(response => response.data && response.data.results.length),
        map(response =>
          takeFirstOnly ? response.data.results[0] : response.data.results
        )
      );
  }
}
