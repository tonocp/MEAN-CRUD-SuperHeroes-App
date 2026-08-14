import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { HeroeComponent } from './heroe.component';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

describe('HeroeComponent', () => {
  let fixture: ComponentFixture<HeroeComponent>;
  let component: HeroeComponent;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const heroe: Heroe = {
    _id: 'abc123',
    superhero: 'Superman',
    publisher: Publisher.DCComics,
    alter_ego: 'Clark Kent',
    first_appearance: 'Action Comics #1',
    characters: 'Lois Lane',
  };

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getHeroePorId']);
    heroesServiceSpy.getHeroePorId.and.returnValue(of(heroe));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HeroeComponent],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: 'abc123' }) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroeComponent);
    component = fixture.componentInstance;
  });

  it('loads the hero identified by the route param', () => {
    component.ngOnInit();

    expect(heroesServiceSpy.getHeroePorId).toHaveBeenCalledWith('abc123');
    expect(component.heroe).toEqual(heroe);
  });

  it('atras() navigates back to the hero listing', () => {
    component.atras();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/listado']);
  });
});
