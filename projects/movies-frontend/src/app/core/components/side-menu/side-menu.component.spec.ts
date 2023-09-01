import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuComponent } from './side-menu.component';
import { ActivatedRoute } from '@angular/router';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SideMenuComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    });
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
