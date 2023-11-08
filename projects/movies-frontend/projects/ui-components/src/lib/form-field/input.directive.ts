import { Directive, inject } from '@angular/core';
import { ElementRef, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective {
  public ngControl = inject(NgControl, {self: true})

  @HostBinding('class') get styles() {
    const classes = 'border-gray-300 border py-2 px-4 w-full rounded-md outline-primary-200';
    const bg = this.ngControl.control?.errors !== null && this.ngControl.control?.touched ? 'border-red-300' : 'border-gray-300';

    return `${classes} ${bg}`
  }

}
