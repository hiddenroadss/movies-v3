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
import { Subject, switchMap, from, concatMap, toArray, filter } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { EditMovieDialogComponent } from '../shared/edit-movie-dialog/edit-movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule, CommonModule],
})
export class MovieDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'title',
    'director',
    'releaseDate',
    'tags',
    'poster',
    'actions',
  ];

  dataSource = new MatTableDataSource<Movie>();
  pageSize = 15;

  reloadMovies$ = new Subject<void>();
  selection = new SelectionModel<Movie>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog
  ) {}

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
    const dialogRef = this.dialog.open(EditMovieDialogComponent, {
      width: '400px',
      data: movie,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(movie => !!movie),
        switchMap(movie => this.moviesService.updateMovie(movie, movie.id))
      )
      .subscribe(() => {
        this.reloadMovies$.next();
      });
  }

  //TODO: fix deleting all movies in table
  deleteMovie(movieId?: number): void {
    if (movieId) {
      this.moviesService
        .deleteMovie(movieId)
        .subscribe(() => this.reloadMovies$.next());
    } else {
      from(this.selection.selected)
        .pipe(
          concatMap(movie => this.moviesService.deleteMovie(movie.id)),
          toArray()
        )
        .subscribe(() => this.reloadMovies$.next());
    }
  }

  trackById(index: number, item: Movie) {
    return item.id;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    //TODO: select only a page, not all data
    this.selection.select(...this.dataSource.data);
  }
}
