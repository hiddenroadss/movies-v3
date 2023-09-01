import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MovieBulkAddComponent } from './movie-bulk-add/movie-bulk-add.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MovieBulkAddComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FormsModule],
})
export class AdminModule {}
