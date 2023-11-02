import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  changeTheme(e: any) {
    this.document.body.setAttribute('data-theme', e.target.value)
  }
}
