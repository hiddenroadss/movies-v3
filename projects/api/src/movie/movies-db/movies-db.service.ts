import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesDbService {
  private readonly API_KEY =
    this.configService.get<string>('MOVIES_DB_API_KEY');
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async fetchMovieData(title: string): Promise<any> {
    try {
      const response = await this.httpService
        .get(`${this.BASE_URL}/search/movie`, {
          params: {
            api_key: this.API_KEY,
            query: title,
          },
        })
        .toPromise();

      if (response.data.results && response.data.results.length > 0) {
        const movies = response.data.results;
        // Extract the required fields from the movie object
        return movies;
      } else {
        throw new Error('Movie not found');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error.message);
      throw error;
    }
  }
}
