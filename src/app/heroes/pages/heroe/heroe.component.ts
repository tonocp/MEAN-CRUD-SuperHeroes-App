import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  standalone: false,
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;
  error = false;

  constructor( private activatedRoute: ActivatedRoute,
               private heroesService: HeroesService,
               private router: Router,
               private cdr: ChangeDetectorRef ) { }

  ngOnInit( ): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      )
      .subscribe({
        next: heroe => {
          this.heroe = heroe;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = true;
          this.cdr.detectChanges();
        },
      });
  }

  atras() {
    this.router.navigate(['/heroes/listado']);
  }

}
