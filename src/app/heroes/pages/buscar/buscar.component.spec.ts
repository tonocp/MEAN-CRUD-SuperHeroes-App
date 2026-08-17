import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { BuscarComponent } from './buscar.component';
import { HeroesService } from '../../services/heroes.service';
import { MaterialModule } from '../../../material/material.module';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

describe('BuscarComponent', () => {
  let fixture: ComponentFixture<BuscarComponent>;
  let component: BuscarComponent;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;

  const heroe: Heroe = {
    _id: 'abc123',
    superhero: 'Superman',
    publisher: Publisher.DCComics,
    alter_ego: 'Clark Kent',
    first_appearance: 'Action Comics #1',
    characters: 'Lois Lane',
  };

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'getSugerencias',
      'getHeroePorId',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BuscarComponent],
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
      providers: [{ provide: HeroesService, useValue: heroesServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarComponent);
    component = fixture.componentInstance;
  });

  it('buscar() populates heroes from getSugerencias()', () => {
    heroesServiceSpy.getSugerencias.and.returnValue(of([heroe]));
    component.termino = 'Super';

    component.buscar();

    expect(heroesServiceSpy.getSugerencias).toHaveBeenCalledWith('Super');
    expect(component.heroes).toEqual([heroe]);
    expect(component.buscando).toBeFalse();
  });

  it('buscar() sets error when getSugerencias() fails', () => {
    heroesServiceSpy.getSugerencias.and.returnValue(throwError(() => new Error('fail')));
    component.termino = 'Super';

    component.buscar();

    expect(component.error).toBeTrue();
    expect(component.buscando).toBeFalse();
  });

  it('opcionSeleccionada() sets heroeSeleccionado directly from the picked option, without another HTTP call', () => {
    const event = { option: { value: heroe } } as MatAutocompleteSelectedEvent;

    component.opcionSeleccionada(event);

    expect(component.heroeSeleccionado).toEqual(heroe);
    expect(component.termino).toBe(heroe.superhero);
    expect(heroesServiceSpy.getHeroePorId).not.toHaveBeenCalled();
  });

  it('opcionSeleccionada() clears heroeSeleccionado when the option has no value', () => {
    component.heroeSeleccionado = heroe;
    const event = { option: { value: '' } } as MatAutocompleteSelectedEvent;

    component.opcionSeleccionada(event);

    expect(component.heroeSeleccionado).toBeUndefined();
  });
});
