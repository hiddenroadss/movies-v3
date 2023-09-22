import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminNavigationComponent } from './shared/admin-navigation/admin-navigation.component';

@Component({
  selector: 'app-admin',
  template: `
    <app-admin-navigation></app-admin-navigation>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, AdminNavigationComponent],
})
export class AdminComponent {}
