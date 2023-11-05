import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '@shared/types';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {
  @Input({required: true}) movie!: Movie;

  constructor() {}

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default_poster.jpg';
  }
}
