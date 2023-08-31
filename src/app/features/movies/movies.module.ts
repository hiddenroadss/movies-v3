import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SharedModule } from '@shared/shared.module';

const routes: Route[] = [
  {
    path: '',
    component: MovieListComponent,
  },
];

@NgModule({
  declarations: [MovieListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class MoviesModule {}
