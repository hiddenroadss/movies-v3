import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { VALIDATION_ERROR_MESSAGES } from './validation-error-messages.token';

@Component({
  selector: 'app-input-errors',
  standalone: true,
  imports: [CommonModule, KeyValuePipe],
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorsComponent {
  @Input() errors: ValidationErrors | undefined | null = null;

  protected errorsMap = inject(VALIDATION_ERROR_MESSAGES)
}
