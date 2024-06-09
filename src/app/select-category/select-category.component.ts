import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-category',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.css'
})
export class SelectCategoryComponent {
  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.router.navigate(['/battle']);
  }
}
