import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MoviesService } from '@core/services/api/movies.service';
import { Movie } from '@shared/types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'director',
    'releaseDate',
    'rating',
    'poster',
    'actions',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService
      .getMovies()
      .subscribe(movies => (this.dataSource.data = movies));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editMovie(movie: Movie): void {
    // Implement the edit functionality here
  }

  deleteMovie(movieId: number): void {
    // Implement the delete functionality here
  }
}
