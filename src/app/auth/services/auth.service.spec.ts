import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('login() POSTs to /api/auth and stores the token on success', () => {
    let result: boolean | string | undefined;

    service.login('test@test.com', '123456').subscribe((ok) => (result = ok));

    const req = httpMock.expectOne(`${baseUrl}/api/auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@test.com', password: '123456' });

    const resp: AuthResponse = { ok: true, token: 'abc123', uid: 'u1', name: 'Test', email: 'test@test.com' };
    req.flush(resp);

    expect(result).toBe(true);
    expect(localStorage.getItem('token')).toBe('abc123');
  });

  it('login() does not store a token when the backend rejects the credentials', () => {
    let result: boolean | string | undefined;

    service.login('test@test.com', 'wrong').subscribe((ok) => (result = ok));

    const req = httpMock.expectOne(`${baseUrl}/api/auth`);
    req.flush({ ok: false, msg: 'Credenciales incorrectas' });

    expect(result).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('login() surfaces the backend error message on an HTTP error response', () => {
    let result: boolean | string | undefined;

    service.login('test@test.com', '123456').subscribe((ok) => (result = ok));

    const req = httpMock.expectOne(`${baseUrl}/api/auth`);
    req.flush({ msg: 'Usuario no encontrado' }, { status: 400, statusText: 'Bad Request' });

    expect(result).toBe('Usuario no encontrado');
  });

  it('registro() POSTs to /api/auth/new and stores the token on success', () => {
    let result: boolean | string | undefined;

    service.registro('Test', 'test@test.com', '123456').subscribe((ok) => (result = ok));

    const req = httpMock.expectOne(`${baseUrl}/api/auth/new`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'Test', email: 'test@test.com', password: '123456' });

    req.flush({ ok: true, token: 'newtoken' });

    expect(result).toBe(true);
    expect(localStorage.getItem('token')).toBe('newtoken');
  });

  it('validarToken() GETs /api/auth/renew, refreshes the token and exposes usuario on success', () => {
    let result: boolean | undefined;

    service.validarToken().subscribe((ok) => (result = ok));

    const req = httpMock.expectOne(`${baseUrl}/api/auth/renew`);
    expect(req.request.method).toBe('GET');

    req.flush({ ok: true, token: 'renewed', uid: 'u1', name: 'Test', email: 'test@test.com' });

    expect(result).toBe(true);
    expect(localStorage.getItem('token')).toBe('renewed');
    expect(service.usuario).toEqual({ uid: 'u1', name: 'Test', email: 'test@test.com' });
  });

  it('validarToken() resolves to false (not an error) when the request fails', () => {
    let result: boolean | undefined;
    let errored = false;

    service.validarToken().subscribe({
      next: (ok) => (result = ok),
      error: () => (errored = true),
    });

    const req = httpMock.expectOne(`${baseUrl}/api/auth/renew`);
    req.flush({ ok: false, msg: 'Token no válido' }, { status: 401, statusText: 'Unauthorized' });

    expect(errored).toBeFalse();
    expect(result).toBe(false);
  });

  it('logout() clears localStorage', () => {
    localStorage.setItem('token', 'abc123');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
