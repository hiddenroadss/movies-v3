import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieBulkAddComponent } from './movie-bulk-add/movie-bulk-add.component';

const routes: Routes = [
  {
    path: '',
    component: MovieBulkAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
