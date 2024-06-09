import { FormsModule } from '@angular/forms';
import { SwapiService } from './../swapi.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-category',
  standalone: true,
  imports: [MatButtonModule, MatRadioModule, MatCardModule, FormsModule],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.css'
})
export class SelectCategoryComponent {
  category = '';
  peopleAttribute = '';
  starshipsAttribute = '';

  constructor(protected router: Router, protected swapiService: SwapiService) {}

  battle() {
    this.swapiService.setCategory(this.category);
    this.swapiService.setAttribute(this.category === 'people' ? this.peopleAttribute : this.starshipsAttribute)
    this.router.navigate(['/battle']);
  }

  isSelectionReady(): boolean {
    return !!this.category && (!!this.peopleAttribute || !!this.starshipsAttribute)
  }

  onCategoryChange() {
    this.clearAtributes();
  }

  private clearAtributes() {
    this.peopleAttribute = '';
    this.starshipsAttribute = '';
  }
}
