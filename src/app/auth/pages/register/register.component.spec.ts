import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['registro']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('starts with an invalid form', () => {
    expect(component.miFormulario.invalid).toBeTrue();
  });

  it('becomes valid with a name, a well-formed email and a 6+ character password', () => {
    component.miFormulario.setValue({ name: 'Test', email: 'test@test.com', password: '123456' });
    expect(component.miFormulario.valid).toBeTrue();
  });

  it('registro() navigates to /heroes on success', () => {
    authServiceSpy.registro.and.returnValue(of(true));
    component.miFormulario.setValue({ name: 'Test', email: 'test@test.com', password: '123456' });

    component.registro();

    expect(authServiceSpy.registro).toHaveBeenCalledWith('Test', 'test@test.com', '123456');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/heroes');
    expect(component.cargando).toBeFalse();
  });

  it('registro() shows an error alert and does not navigate on failure', () => {
    spyOn(Swal, 'fire');
    authServiceSpy.registro.and.returnValue(of('El correo ya está en uso'));
    component.miFormulario.setValue({ name: 'Test', email: 'test@test.com', password: '123456' });

    component.registro();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'El correo ya está en uso', 'error');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });
});
