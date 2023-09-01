import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieBulkAddComponent } from './movie-bulk-add/movie-bulk-add.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';

const routes: Routes = [
  {
    path: 'add-bulk',
    component: MovieBulkAddComponent,
  },
  {
    path: 'dashboard',
    component: MovieDashboardComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
