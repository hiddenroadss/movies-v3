import { Component, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelDirective } from './label.directive';
import { InputDirective } from './input.directive';

@Component({
  selector: 'ts-form-field',
  templateUrl: './form-field.component.html',
  styles: [],
  standalone: true
})
export class FormFieldComponent {
  @ContentChild(LabelDirective) label!: LabelDirective;
  @ContentChild(InputDirective) input!: InputDirective;
 
  ngAfterContentInit() {
   this.input.ngControl.control?.statusChanges.pipe(
   ).subscribe()
  
  }
}
