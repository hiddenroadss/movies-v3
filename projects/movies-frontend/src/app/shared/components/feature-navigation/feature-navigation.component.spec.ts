import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FeatureNavigationComponent } from './feature-navigation.component';
import { ActivatedRoute } from '@angular/router';

describe('FeatureNavigationComponent', () => {
  let spectator: Spectator<FeatureNavigationComponent>;

  const createComponent = createComponentFactory({
    component: FeatureNavigationComponent,
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
