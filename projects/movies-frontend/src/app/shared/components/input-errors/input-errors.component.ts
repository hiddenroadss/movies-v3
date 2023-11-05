import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule, KeyValue, KeyValuePipe } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessagePipe } from '@shared/pipes/error-message.pipe';

@Component({
  selector: 'app-input-errors',
  standalone: true,
  imports: [CommonModule, KeyValuePipe, ErrorMessagePipe],
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorsComponent {
  @Input() errors: ValidationErrors | undefined | null = null;

  trackByKey(index: number, item: KeyValue<string, any>) {
    return item.key;

  }
}
