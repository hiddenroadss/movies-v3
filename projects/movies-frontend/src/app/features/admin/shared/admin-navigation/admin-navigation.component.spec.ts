import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AdminNavigationComponent } from './admin-navigation.component';
import { ActivatedRoute } from '@angular/router';

describe('AdminNavigationComponent', () => {
  let spectator: Spectator<AdminNavigationComponent>;

  const createComponent = createComponentFactory({
    component: AdminNavigationComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: new Map(),
          },
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
