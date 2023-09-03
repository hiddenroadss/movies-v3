import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <app-admin-navigation></app-admin-navigation>
    <router-outlet></router-outlet>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {}
