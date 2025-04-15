import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-visualizar-empresa',
  standalone: false,
  templateUrl: './dialog-visualizar-empresa.component.html',
  styleUrl: './dialog-visualizar-empresa.component.css'
})
export class DialogVisualizarEmpresaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
