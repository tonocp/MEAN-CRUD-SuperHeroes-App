import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  standalone: false,
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  placeholder: string = 'assets/no-image.png';

  transform( heroe: Heroe ): string {
    return heroe.alt_img ? heroe.alt_img : this.placeholder;
  }

}
