import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { MovieBulkAddComponent } from './movie-bulk-add/movie-bulk-add.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { EditMovieDialogComponent } from './shared/edit-movie-dialog/edit-movie-dialog.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { AdminComponent } from './admin.component';

const components = [
  MovieBulkAddComponent,
  MovieCreateComponent,
  MovieDashboardComponent,
  EditMovieDialogComponent,
  AdminComponent,
];

@NgModule({
  imports: [AdminRoutingModule, ...components],
})
export class AdminModule {}
