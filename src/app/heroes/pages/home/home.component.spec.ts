import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthService } from '../../../auth/services/auth.service';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      usuario: { uid: 'u1', name: 'Test', email: 'test@test.com' },
    });
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('exposes the logged-in user from AuthService', () => {
    expect(component.usuario).toEqual({ uid: 'u1', name: 'Test', email: 'test@test.com' });
  });

  it('logout() clears the session and navigates to /auth', () => {
    component.logout();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth');
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
