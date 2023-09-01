import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDashboardComponent } from './movie-dashboard.component';

describe('MovieDashboardComponent', () => {
  let component: MovieDashboardComponent;
  let fixture: ComponentFixture<MovieDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDashboardComponent]
    });
    fixture = TestBed.createComponent(MovieDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
