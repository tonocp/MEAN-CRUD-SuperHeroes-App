import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { ListadoComponent } from './listado.component';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

describe('ListadoComponent', () => {
  let fixture: ComponentFixture<ListadoComponent>;
  let component: ListadoComponent;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;

  const heroes: Heroe[] = [
    {
      _id: 'abc123',
      superhero: 'Superman',
      publisher: Publisher.DCComics,
      alter_ego: 'Clark Kent',
      first_appearance: 'Action Comics #1',
      characters: 'Lois Lane',
    },
  ];

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getHeroes']);
    heroesServiceSpy.getHeroes.and.returnValue(of(heroes));

    await TestBed.configureTestingModule({
      declarations: [ListadoComponent],
      providers: [{ provide: HeroesService, useValue: heroesServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
  });

  it('loads the hero list on init', () => {
    component.ngOnInit();

    expect(heroesServiceSpy.getHeroes).toHaveBeenCalled();
    expect(component.heroes).toEqual(heroes);
    expect(component.cargando).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('sets error when getHeroes() fails', () => {
    heroesServiceSpy.getHeroes.and.returnValue(throwError(() => new Error('fail')));

    component.ngOnInit();

    expect(component.cargando).toBeFalse();
    expect(component.error).toBeTrue();
  });
});
