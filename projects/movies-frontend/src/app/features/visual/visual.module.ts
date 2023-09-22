import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualRoutingModule } from './visual-routing.module';
import { VisualComponent } from './visual.component';

@NgModule({
  imports: [VisualRoutingModule, VisualComponent],
})
export class VisualModule {}
