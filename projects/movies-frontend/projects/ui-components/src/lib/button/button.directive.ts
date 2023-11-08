import { Directive, HostBinding, Input } from '@angular/core';

export type Button = 'solid' | 'outline' | 'ghost';

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective {

  @Input() buttonType: Button = 'solid';


  @HostBinding('class') get classes() {
    if (this.buttonType === 'outline') {
      return 'bg-transparent text-primary-500 border border-primary-500 px-4 py-2 rounded-md font-semibold hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition disabled:text-primary-300 disabled:border-primary-300 disabled:cursor-not-allowed'
    }
    if (this.buttonType === 'ghost') {
      return 'bg-transparent text-primary-500 px-4 py-2 rounded-md font-semibold hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition disabled:text-primary-300 disabled:cursor-not-allowed'
    }
    return 'bg-primary-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition disabled:bg-primary-300 disabled:text-white disabled:cursor-not-allowed';

  }
  constructor() { }

}
