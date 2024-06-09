import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private apiUrl = 'https://www.swapi.tech/api';

  private category = '';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.category}`);
  }

  isCategorySet() {
    return !!this.category;
  }

  setCategory(category: string) {
    this.category = category;
  }
}
