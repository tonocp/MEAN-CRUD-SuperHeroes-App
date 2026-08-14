import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HeroesService } from './heroes.service';
import { environment } from '../../../environments/environment';
import { Heroe, Publisher } from '../interfaces/heroes.interface';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  const heroeMock: Heroe = {
    _id: 'abc123',
    superhero: 'Superman',
    publisher: Publisher.DCComics,
    alter_ego: 'Clark Kent',
    first_appearance: 'Action Comics #1',
    characters: 'Lois Lane',
    alt_img: 'assets/heroes/superman.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getHeroes() GETs /api/heroes/list', () => {
    let result: Heroe[] | undefined;
    service.getHeroes().subscribe((heroes) => (result = heroes));

    const req = httpMock.expectOne(`${baseUrl}/api/heroes/list`);
    expect(req.request.method).toBe('GET');
    req.flush([heroeMock]);

    expect(result).toEqual([heroeMock]);
  });

  it('getHeroePorId() GETs /api/heroes/:id', () => {
    let result: Heroe | undefined;
    service.getHeroePorId('abc123').subscribe((heroe) => (result = heroe));

    const req = httpMock.expectOne(`${baseUrl}/api/heroes/abc123`);
    expect(req.request.method).toBe('GET');
    req.flush(heroeMock);

    expect(result).toEqual(heroeMock);
  });

  it('getSugerencias() GETs /api/heroes/search/:termino', () => {
    let result: Heroe[] | undefined;
    service.getSugerencias('Super').subscribe((heroes) => (result = heroes));

    const req = httpMock.expectOne(`${baseUrl}/api/heroes/search/Super`);
    expect(req.request.method).toBe('GET');
    req.flush([heroeMock]);

    expect(result).toEqual([heroeMock]);
  });

  it('agregarHeroe() POSTs to /api/heroes/new', () => {
    const nuevo: Heroe = { ...heroeMock, _id: undefined };
    let result: Heroe | undefined;

    service.agregarHeroe(nuevo).subscribe((heroe) => (result = heroe));

    const req = httpMock.expectOne(`${baseUrl}/api/heroes/new`);
    expect(req.request.method).toBe('POST');
    req.flush(heroeMock);

    expect(result).toEqual(heroeMock);
  });

  it('agregarHeroe() falls back to the placeholder image when alt_img is empty', () => {
    const nuevo: Heroe = { ...heroeMock, _id: undefined, alt_img: '' };

    service.agregarHeroe(nuevo).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/api/heroes/new`);
    expect(req.request.body.alt_img).toBe('assets/no-image.png');
    req.flush(heroeMock);
  });

  it('actualizarHeroe() PUTs to /api/heroes/edit/:_id', () => {
    let result: Heroe | undefined;
    service.actualizarHeroe(heroeMock).subscribe((heroe) => (result = heroe));

    const req = httpMock.expectOne(`${baseUrl}/api/heroes/edit/abc123`);
    expect(req.request.method).toBe('PUT');
    req.flush(heroeMock);

    expect(result).toEqual(heroeMock);
  });

  it('borrarHeroe() DELETEs /api/heroes/:_id', () => {
    let done = false;
    service.borrarHeroe('abc123').subscribe(() => (done = true));

    const req = httpMock.expectOne(`${baseUrl}/api/heroes/abc123`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ ok: true });

    expect(done).toBeTrue();
  });
});
