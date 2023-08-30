import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    component: MoviesComponent
  }
];

@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MoviesModule {}
