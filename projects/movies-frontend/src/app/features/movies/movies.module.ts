import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SharedModule } from '@shared/shared.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Route[] = [
  {
    path: '',
    component: MovieListComponent,
  },
  {
    path: 'details/:id',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  declarations: [MovieListComponent, MovieDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class MoviesModule {}
