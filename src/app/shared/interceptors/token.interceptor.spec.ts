import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('adds the x-token header when a token is stored', () => {
    localStorage.setItem('token', 'abc123');

    http.get('/api/heroes/list').subscribe();

    const req = httpMock.expectOne('/api/heroes/list');
    expect(req.request.headers.get('x-token')).toBe('abc123');
    req.flush({});
  });

  it('does not add an x-token header when there is no stored token', () => {
    http.get('/api/heroes/list').subscribe();

    const req = httpMock.expectOne('/api/heroes/list');
    expect(req.request.headers.has('x-token')).toBeFalse();
    req.flush({});
  });
});
