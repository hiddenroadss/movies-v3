import { InjectionToken} from '@angular/core';

export const ERROR_MESSAGES: {[key: string]: (args?: any) => string} = {
    required: () => 'This field is required',
    minlength:(errValue) =>  `The value length should be at least ${errValue.requiredLength} characters`
} 

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Messages', {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES
})