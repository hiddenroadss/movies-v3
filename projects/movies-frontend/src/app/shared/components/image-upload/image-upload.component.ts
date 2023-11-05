import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

//TODO: add click event and read about accessibility

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageUploadComponent,
      multi: true
    }
  ]
})
export class ImageUploadComponent implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);
  value: File | null = null;

   onChange: (value: File | null) => void = () => {};

   onTouched: () => void = () => {};

  get imageUrl() {
    return this.value ? URL.createObjectURL(this.value) : '';
  }


  writeValue(obj: any): void {
    this.value = obj;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onFileChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;

    this.writeValue(file);
    this.onChange(file); 
    this.onTouched(); 
  }

}
