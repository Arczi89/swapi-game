import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<any> {
    return this.http.get(`${this.apiUrl}/people`);
  }

  getSpaceships(): Observable<any> {
    return this.http.get(`${this.apiUrl}/starships`);
  }
}
