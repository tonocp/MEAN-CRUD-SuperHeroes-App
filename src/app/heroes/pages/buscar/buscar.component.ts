import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  standalone: false,
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesService: HeroesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim()).subscribe((heroes) => {
      this.heroes = heroes;
      this.cdr.detectChanges();
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroeSeleccionado = heroe;
    this.cdr.detectChanges();
  }
}
