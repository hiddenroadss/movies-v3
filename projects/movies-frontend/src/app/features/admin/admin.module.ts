import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MovieBulkAddComponent } from './movie-bulk-add/movie-bulk-add.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { EditMovieDialogComponent } from './shared/edit-movie-dialog/edit-movie-dialog.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { AdminComponent } from './admin.component';
import { AdminNavigationComponent } from './shared/admin-navigation/admin-navigation.component';

@NgModule({
  declarations: [
    MovieBulkAddComponent,
    MovieDashboardComponent,
    EditMovieDialogComponent,
    MovieCreateComponent,
    AdminComponent,
    AdminNavigationComponent,
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
