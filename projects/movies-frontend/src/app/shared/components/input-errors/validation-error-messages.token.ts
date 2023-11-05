import { InjectionToken} from '@angular/core';

export const ERROR_MESSAGES: {[key: string]: string} = {
    required: 'This field is required',
    minlength: 'The value length is too short'
} 

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Messages', {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES
})