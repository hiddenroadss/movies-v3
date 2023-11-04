import { Directive } from '@angular/core';
import { ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective {

  constructor(private elementRef: ElementRef<HTMLInputElement>) { }

  @HostBinding('class') get styles() {
    if(this.elementRef.nativeElement.tagName === 'INPUT') {
      return 'w-full py-2 px-4 border border-gray-300 rounded-md'
    } else if (this.elementRef.nativeElement.tagName === 'TEXTAREA') {
      return 'w-full py-2 px-4 border border-gray-300 rounded-md'
    }
    return '';
  }

}
