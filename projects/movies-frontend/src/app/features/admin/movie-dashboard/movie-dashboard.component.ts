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
import { Subject, switchMap } from 'rxjs';

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

  dataSource = new MatTableDataSource<Movie>();

  reloadMovies$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    //TODO: add backend pagination
    this.reloadMovies$
      .pipe(switchMap(() => this.moviesService.getMovies()))
      .subscribe(movies => (this.dataSource.data = movies));
    this.reloadMovies$.next();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editMovie(movie: Movie): void {
    // Implement the edit functionality here
  }

  deleteMovie(movieId: number): void {
    this.moviesService
      .deleteMovie(movieId)
      .subscribe(() => this.reloadMovies$.next());
  }

  trackById(index: number, item: Movie) {
    return item.id;
  }
}
