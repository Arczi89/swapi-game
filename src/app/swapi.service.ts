import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private apiUrl = 'https://www.swapi.tech/api';

  private category = '';
  private attribute = '';

  constructor(private http: HttpClient) {
    this.initCategoryAndAttribute();
  }

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.category}`);
  }

  getCategory(): string {
    return this.category;
  }

  getAttribute(): string {
    return this.attribute;
  }

  isCategorySet(): boolean {
    return !!localStorage.getItem('category') || !!this.category;
  }

  setCategory(category: string) {
    this.category = category;
    localStorage.setItem('category', category);
  }

  setAttribute(attribute: any) {
    this.attribute = attribute;
  }

  private initCategoryAndAttribute(): void {
    this.category = localStorage.getItem('category') || '';
    this.attribute = localStorage.getItem('attribute') || '';
  }
}


