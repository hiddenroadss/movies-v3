import { Component, ContentChild } from '@angular/core';
import { LabelDirective } from './label.directive';
import { InputDirective } from './input.directive';
import { Subject, takeUntil, startWith } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ts-form-field',
  templateUrl: './form-field.component.html',
  styles: [],
  standalone: true
})
export class FormFieldComponent {
  @ContentChild(LabelDirective) label!: LabelDirective;
  @ContentChild(InputDirective) input!: InputDirective;
 
  private destroy$ = new Subject<void>();

  ngAfterContentInit() {
    if (this.input.ngControl) {
      this.input.ngControl.control?.statusChanges
        .pipe(startWith(null), takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateLabelText();
          this.updateLabelColor();
        });
    }
  }

  updateLabelText() {
    const control = this.input.ngControl.control;
    if (control) {
      const isRequired = control.hasValidator(Validators.required)

      if (isRequired) {
        if (!this.label.elementRef.nativeElement.textContent.trim().endsWith('*')) {
          this.label.elementRef.nativeElement.textContent += '*';
        }
      } else {
        this.label.elementRef.nativeElement.textContent = this.label.elementRef.nativeElement.textContent.replace('*', '');
      }
    }
  }

  updateLabelColor() {
    const control = this.input.ngControl.control;
    if (control) {
      const hasErrors = control.touched && control.errors;
      if (hasErrors) {
        this.label.elementRef.nativeElement.classList.remove('text-black')
        this.label.elementRef.nativeElement.classList.add('text-red-500')
      } else {
        this.label.elementRef.nativeElement.classList.remove('text-red-500')
        this.label.elementRef.nativeElement.classList.add('text-black')
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
