import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SwapiService,
        HttpClient,
        HttpHandler,
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
