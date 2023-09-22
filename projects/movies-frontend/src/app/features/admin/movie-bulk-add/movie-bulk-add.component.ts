import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '@core/services/api/movies.service';
import { MaterialModule } from '@shared/material.module';
import { Movie } from '@shared/types';

@Component({
  selector: 'app-movie-bulk-add',
  templateUrl: './movie-bulk-add.component.html',
  styleUrls: ['./movie-bulk-add.component.scss'],
  standalone: true,
  imports: [FormsModule, MaterialModule],
})
export class MovieBulkAddComponent {
  movieTitles = '';

  constructor(private movieService: MoviesService) {}

  addMovies(): void {
    const titles = this.movieTitles
      .split(/[\n,]+/)
      .map(title => title.trim().replace(/(^["']|["']$)/g, ''))
      .filter(title => title.length > 0);
    const movies: Movie[] = titles.map(title => ({ title }) as Movie);
    this.movieService.addMovies(movies).subscribe(() => {
      this.movieTitles = '';
    });
  }
}
