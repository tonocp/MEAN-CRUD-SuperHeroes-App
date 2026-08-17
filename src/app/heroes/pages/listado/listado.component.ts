import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  standalone: false,
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];
  cargando = true;
  error = false;

  constructor(
    private heroesService: HeroesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes = heroes;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.error = true;
        this.cdr.detectChanges();
      },
    });
  }
}
