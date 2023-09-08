import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualRoutingModule } from './visual-routing.module';
import { VisualComponent } from './visual.component';
import { PieChartComponent } from '@shared/components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [VisualComponent],
  imports: [CommonModule, VisualRoutingModule, PieChartComponent],
})
export class VisualModule {}
