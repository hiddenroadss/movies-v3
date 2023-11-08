import { Pipe, PipeTransform, inject } from '@angular/core';
import { VALIDATION_ERROR_MESSAGES } from '../input-errors/validation-error-messages.token';

@Pipe({
  name: 'errorMessage',
  standalone: true
})
export class ErrorMessagePipe implements PipeTransform {

  errorMessages = inject(VALIDATION_ERROR_MESSAGES);

  transform(key: string, errValue: any): string {
    if (!this.errorMessages[key]) {
      console.warn(`Missing error message for the key ${key} validator`)
      return '';
    }
    return this.errorMessages[key](errValue)
  }

}
