import { Directive, inject, ViewContainerRef, ComponentRef, ElementRef } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Subscription, from, fromEvent, merge, skip, startWith } from 'rxjs';
import { InputErrorsComponent } from './input-errors/input-errors.component';

@Directive({
  selector: '[formControl],[formControlName],[ngModel]',
  standalone: true
})
export class DynamicValidatorMessageDirective {
  ngControl = inject(NgControl, {self: true})

  private vcr = inject(ViewContainerRef)
  private componentRef: ComponentRef<InputErrorsComponent> | null = null;
  private elementRef = inject(ElementRef)
  private subscription!: Subscription;

  ngOnInit() {
    if (!this.ngControl.control) {
      throw new Error(`No control model for ${this.ngControl.name} control`);
    }
    this.subscription = merge(
      this.ngControl.control.statusChanges,
      fromEvent(this.elementRef.nativeElement, 'blur')
      ).pipe(startWith(this.ngControl.control.status), skip(this.ngControl instanceof NgModel ? 1 : 0))
    .subscribe(() => {
      if (this.ngControl.errors && this.ngControl.control?.touched) {
          if (!this.componentRef) {
            this.componentRef = this.vcr.createComponent(InputErrorsComponent);
            this.componentRef.changeDetectorRef.markForCheck();
          } 
          this.componentRef.setInput('errors', this.ngControl.errors);
        } else {
          this.componentRef?.destroy();
          this.componentRef = null;
        }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
