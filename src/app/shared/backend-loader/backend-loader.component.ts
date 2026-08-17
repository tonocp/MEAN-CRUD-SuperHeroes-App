import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-backend-loader',
  templateUrl: './backend-loader.component.html',
  styleUrls: ['./backend-loader.component.css'],
})
export class BackendLoaderComponent {
  @Input() cargando = false;
  @Input() error = false;
  @Input() mensajeCarga = 'Cargando...';
  @Input() mensajeError =
    'No se han podido cargar los datos. El backend gratuito puede tardar unos segundos en despertar tras estar inactivo — prueba de nuevo en unos segundos.';
}
