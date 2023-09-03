import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MoviesService } from '@core/services/api/movies.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCreateComponent {
  movieForm: FormGroup;
  tags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: [''],
      releaseDate: [''],
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movieData = { ...this.movieForm.value, tags: this.tags };
      this.moviesService.createMovie(movieData).subscribe(() => {
        this.router.navigate(['/admin/dashboard']);
        // Navigate to the movie list or display a success message
      });
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
