import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/api/heroes/list`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/api/heroes/${id}`, {
      headers: { id: id },
    });
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(
      `${this.baseUrl}/api/heroes/search/${termino}`,
      {
        headers: { termino: termino },
      }
    );
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    if (heroe.alt_img === '') heroe.alt_img = 'assets/no-image.png';
    return this.http.post<Heroe>(`${this.baseUrl}/api/heroes/new`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(
      `${this.baseUrl}/api/heroes/edit/${heroe._id}`,
      heroe
    );
  }

  borrarHeroe(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/heroes/${_id}`, {
      headers: { _id: _id },
    });
  }
}
