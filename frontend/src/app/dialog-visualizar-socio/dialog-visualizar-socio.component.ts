import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-visualizar-socio',
  standalone: false,
  templateUrl: './dialog-visualizar-socio.component.html',
  styleUrl: './dialog-visualizar-socio.component.css'
})
export class DialogVisualizarSocioComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
