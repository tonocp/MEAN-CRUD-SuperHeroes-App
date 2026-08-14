import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ValidarTokenGuard } from './validar-token.guard';
import { AuthService } from '../services/auth.service';

describe('ValidarTokenGuard', () => {
  let guard: ValidarTokenGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['validarToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        ValidarTokenGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(ValidarTokenGuard);
  });

  it('canActivate() allows navigation and does not redirect when the token is valid', (done) => {
    authServiceSpy.validarToken.and.returnValue(of(true));

    (guard.canActivate() as any).subscribe((valid: boolean) => {
      expect(valid).toBeTrue();
      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
      done();
    });
  });

  it('canActivate() blocks navigation and redirects to /auth when the token is invalid', (done) => {
    authServiceSpy.validarToken.and.returnValue(of(false));

    (guard.canActivate() as any).subscribe((valid: boolean) => {
      expect(valid).toBeFalse();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth');
      done();
    });
  });

  it('canLoad() allows lazy loading and does not redirect when the token is valid', (done) => {
    authServiceSpy.validarToken.and.returnValue(of(true));

    (guard.canLoad() as any).subscribe((valid: boolean) => {
      expect(valid).toBeTrue();
      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
      done();
    });
  });

  it('canLoad() blocks lazy loading and redirects to /auth when the token is invalid', (done) => {
    authServiceSpy.validarToken.and.returnValue(of(false));

    (guard.canLoad() as any).subscribe((valid: boolean) => {
      expect(valid).toBeFalse();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth');
      done();
    });
  });
});
