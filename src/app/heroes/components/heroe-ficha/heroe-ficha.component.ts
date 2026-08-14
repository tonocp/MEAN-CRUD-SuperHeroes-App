import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  standalone: false,
  selector: 'app-heroe-ficha',
  templateUrl: './heroe-ficha.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 20px;
    }
  `]
})
export class HeroeFichaComponent {

  @Input() heroe!: Heroe;

}
