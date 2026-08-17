import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('starts with an invalid form', () => {
    expect(component.miFormulario.invalid).toBeTrue();
  });

  it('becomes valid with a well-formed email and a 6+ character password', () => {
    component.miFormulario.setValue({ email: 'test@test.com', password: '123456' });
    expect(component.miFormulario.valid).toBeTrue();
  });

  it('login() navigates to /heroes on success', () => {
    authServiceSpy.login.and.returnValue(of(true));
    component.miFormulario.setValue({ email: 'test@test.com', password: '123456' });

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@test.com', '123456');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/heroes');
    expect(component.cargando).toBeFalse();
  });

  it('login() shows an error alert and does not navigate on failure', () => {
    spyOn(Swal, 'fire');
    authServiceSpy.login.and.returnValue(of('Credenciales incorrectas'));
    component.miFormulario.setValue({ email: 'test@test.com', password: '123456' });

    component.login();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Credenciales incorrectas', 'error');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });
});
