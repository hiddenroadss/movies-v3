import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoviesService } from '@core/services/api/movies.service';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualComponent {
  tagStats: { name: string; value: number }[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      const tagCountMap = new Map<string, number>();

      movies.forEach(movie => {
        movie.tags.forEach(tag => {
          const count = tagCountMap.get(tag.name) || 0;
          tagCountMap.set(tag.name, count + 1);
        });
      });

      this.tagStats = Array.from(tagCountMap.entries()).map(
        ([name, value]) => ({ name, value })
      );
    });
  }
}
