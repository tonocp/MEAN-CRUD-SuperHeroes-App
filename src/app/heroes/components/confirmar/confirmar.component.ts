import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  standalone: false,
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialoRef: MatDialogRef<ConfirmarComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Heroe ) { }

  ngOnInit(): void {
  }

  borrar(){
    this.dialoRef.close(true);
  }

  cancelar(){
    this.dialoRef.close();
  }

}
