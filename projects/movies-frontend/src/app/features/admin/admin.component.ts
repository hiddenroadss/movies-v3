import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureNavigationComponent } from '@shared/components/feature-navigation/feature-navigation.component';

@Component({
  selector: 'app-admin',
  template: `
    <app-feature-navigation></app-feature-navigation>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, FeatureNavigationComponent],
})
export class AdminComponent {}
