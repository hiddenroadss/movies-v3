import { ChangeDetectionStrategy, Component, ContentChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl, Validators } from '@angular/forms';
import { LabelDirective } from '@shared/directives/label.directive';
import { distinctUntilChanged, tap } from 'rxjs';
import { InputDirective } from '@shared/directives/input.directive';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
 @ContentChild(LabelDirective) label!: LabelDirective;
 @ContentChild(InputDirective) input!: InputDirective;

 ngAfterContentInit() {
  this.input.ngControl.control?.statusChanges.pipe(
    tap(() => {
     
    })
  ).subscribe()
 
 }
}
