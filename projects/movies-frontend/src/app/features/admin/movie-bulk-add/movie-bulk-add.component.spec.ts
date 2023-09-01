import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBulkAddComponent } from './movie-bulk-add.component';

describe('MovieBulkAddComponent', () => {
  let component: MovieBulkAddComponent;
  let fixture: ComponentFixture<MovieBulkAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieBulkAddComponent],
    });
    fixture = TestBed.createComponent(MovieBulkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
