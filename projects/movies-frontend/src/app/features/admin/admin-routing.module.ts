import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieBulkAddComponent } from './movie-bulk-add/movie-bulk-add.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'add-bulk',
        component: MovieBulkAddComponent,
      },
      {
        path: 'dashboard',
        component: MovieDashboardComponent,
      },
      { path: 'create', component: MovieCreateComponent },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
