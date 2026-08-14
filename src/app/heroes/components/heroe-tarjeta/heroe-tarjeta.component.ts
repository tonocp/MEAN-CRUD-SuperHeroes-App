import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  standalone: false,
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card {
    margin-top: 20px;
    width: 100%;
  }
  img[mat-card-image] {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
  }
`]
})
export class HeroeTarjetaComponent {

  @Input() heroe!: Heroe;

}
