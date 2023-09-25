import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

//TODO: add click event and read about accessibility

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  @Output() imageSelected = new EventEmitter<File>();

  imageUrl: string | ArrayBuffer | null = null;

  onFileChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target!.result;
        this.imageSelected.emit(file);
      };
      reader.readAsDataURL(file);
    }
  }

  openInputFile(): void {
    this.inputFile.nativeElement.click();
  }

  resetImage(): void {
    this.imageUrl = null;
    this.inputFile.nativeElement.value = '';
  }
}
