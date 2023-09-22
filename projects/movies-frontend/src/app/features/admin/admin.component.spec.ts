import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AdminComponent } from './admin.component';
import { ActivatedRoute } from '@angular/router';

describe('AdminComponent', () => {
  let spectator: Spectator<AdminComponent>;

  const createComponent = createComponentFactory({
    component: AdminComponent,
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
