import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stars-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars-rating.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StarsRatingComponent,
      multi: true
    }
  ]
})
export class StarsRatingComponent implements ControlValueAccessor {
rating!: number;
private onChange: (rating: number) => void = () => {};

private onTouched: () => void = () => {};

writeValue(value: number): void {
  this.rating = value;
}

registerOnChange(fn: (rating: number) => void): void {
  this.onChange = fn;
}

registerOnTouched(fn: () => void): void {
  this.onTouched = fn;
}

onStarClicked(starIndex: number): void {
  this.rating = starIndex + 1;
  this.onChange(this.rating);
  this.onTouched();
}

}
