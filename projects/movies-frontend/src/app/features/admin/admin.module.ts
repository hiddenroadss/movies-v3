import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MovieBulkAddComponent } from './movie-bulk-add/movie-bulk-add.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { EditMovieDialogComponent } from './shared/edit-movie-dialog/edit-movie-dialog.component';

@NgModule({
  declarations: [
    MovieBulkAddComponent,
    MovieDashboardComponent,
    EditMovieDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
