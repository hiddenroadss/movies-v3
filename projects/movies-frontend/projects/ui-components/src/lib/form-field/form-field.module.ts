import { NgModule } from '@angular/core';
import { FormFieldComponent } from './form-field.component';
import { InputDirective } from './input.directive';
import { LabelDirective } from './label.directive';
import { DynamicValidatorMessageDirective } from './dynamic-validator-message.directive';



@NgModule({
  declarations: [
  ],
  imports: [
    FormFieldComponent,
    InputDirective,
    LabelDirective,
    DynamicValidatorMessageDirective
  ],
  exports: [FormFieldComponent, InputDirective, LabelDirective, DynamicValidatorMessageDirective]
})
export class FormFieldModule { }
