import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: 'label',
  standalone: true
})
export class LabelDirective {

  constructor(public elementRef: ElementRef) { }

}
