import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
export class ImageUploadComponent implements OnChanges {
  @Input() inputImageFile: File | null = null; // Add this line
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  @Output() imageSelected = new EventEmitter<File>();

  imageUrl: string | ArrayBuffer | null = null;

  //TODO: add setter insted of ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputImageFile'] && this.inputImageFile) {
      this.updateImage(this.inputImageFile);
    }
  }

  onFileChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.updateImage(file);
    }
  }

  openInputFile(): void {
    this.inputFile.nativeElement.click();
  }

  resetImage(): void {
    this.imageUrl = null;
    this.inputFile.nativeElement.value = '';
  }

  private updateImage(file: File): void {
    const reader = new FileReader();
    reader.onload = e => {
      this.imageUrl = e.target!.result;
      this.imageSelected.emit(file);
    };
    reader.readAsDataURL(file);
  }
}
