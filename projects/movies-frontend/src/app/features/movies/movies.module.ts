import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
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
  imports: [
    RouterModule.forChild(routes),
    MovieListComponent,
    MovieDetailsComponent,
  ],
})
export class MoviesModule {}
