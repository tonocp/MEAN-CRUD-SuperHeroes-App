import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { AgregarComponent } from './agregar.component';
import { HeroesService } from '../../services/heroes.service';
import { MaterialModule } from '../../../material/material.module';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

describe('AgregarComponent', () => {
  let fixture: ComponentFixture<AgregarComponent>;
  let component: AgregarComponent;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let routerSpy: jasmine.SpyObj<Router> & { url: string };
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let activatedRouteStub: { params: any };

  const heroeExistente: Heroe = {
    _id: 'abc123',
    superhero: 'Superman',
    publisher: Publisher.DCComics,
    alter_ego: 'Clark Kent',
    first_appearance: 'Action Comics #1',
    characters: 'Lois Lane',
  };

  function crearComponente() {
    fixture = TestBed.createComponent(AgregarComponent);
    component = fixture.componentInstance;
  }

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'getHeroePorId',
      'agregarHeroe',
      'actualizarHeroe',
      'borrarHeroe',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.url = '/heroes/agregar';
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    activatedRouteStub = { params: of({}) };

    await TestBed.configureTestingModule({
      declarations: [AgregarComponent, ImagenPipe],
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('ngOnInit() does not load a hero outside edit mode', () => {
    routerSpy.url = '/heroes/agregar';
    crearComponente();

    component.ngOnInit();

    expect(heroesServiceSpy.getHeroePorId).not.toHaveBeenCalled();
  });

  it('ngOnInit() loads the hero by route id in edit mode', () => {
    routerSpy.url = '/heroes/editar/abc123';
    activatedRouteStub.params = of({ id: 'abc123' });
    heroesServiceSpy.getHeroePorId.and.returnValue(of(heroeExistente));
    crearComponente();

    component.ngOnInit();

    expect(heroesServiceSpy.getHeroePorId).toHaveBeenCalledWith('abc123');
    expect(component.heroe).toEqual(heroeExistente);
  });

  it('guardar() creates a new hero and navigates to its edit route', () => {
    crearComponente();
    component.heroe = { ...heroeExistente, _id: undefined };
    heroesServiceSpy.agregarHeroe.and.returnValue(of(heroeExistente));

    component.guardar();

    expect(heroesServiceSpy.agregarHeroe).toHaveBeenCalled();
    expect(heroesServiceSpy.actualizarHeroe).not.toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/editar', heroeExistente._id]);
    expect(snackBarSpy.open).toHaveBeenCalled();
  });

  it('guardar() updates an existing hero in place', () => {
    crearComponente();
    component.heroe = { ...heroeExistente };
    heroesServiceSpy.actualizarHeroe.and.returnValue(of(heroeExistente));

    component.guardar();

    expect(heroesServiceSpy.actualizarHeroe).toHaveBeenCalledWith(heroeExistente);
    expect(heroesServiceSpy.agregarHeroe).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalled();
  });

  it('guardar() does nothing when the hero name is blank', () => {
    crearComponente();
    component.heroe = { ...heroeExistente, _id: undefined, superhero: '   ' };

    component.guardar();

    expect(heroesServiceSpy.agregarHeroe).not.toHaveBeenCalled();
    expect(heroesServiceSpy.actualizarHeroe).not.toHaveBeenCalled();
  });

  it('borrar() deletes the hero and navigates to the listing when confirmed', () => {
    crearComponente();
    component.heroe = { ...heroeExistente };
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);
    heroesServiceSpy.borrarHeroe.and.returnValue(of({ ok: true }));

    component.borrar();

    expect(heroesServiceSpy.borrarHeroe).toHaveBeenCalledWith('abc123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/listado']);
  });

  it('borrar() does nothing when the confirmation dialog is cancelled', () => {
    crearComponente();
    component.heroe = { ...heroeExistente };
    dialogSpy.open.and.returnValue({ afterClosed: () => of(undefined) } as any);

    component.borrar();

    expect(heroesServiceSpy.borrarHeroe).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
