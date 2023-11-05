import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorsComponent } from './input-errors.component';

describe('InputErrorsComponent', () => {
  let component: InputErrorsComponent;
  let fixture: ComponentFixture<InputErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputErrorsComponent]
    });
    fixture = TestBed.createComponent(InputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
