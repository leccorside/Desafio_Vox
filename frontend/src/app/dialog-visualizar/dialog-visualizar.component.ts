import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-visualizar',
  standalone: false,
  templateUrl: './dialog-visualizar.component.html'
})
export class DialogVisualizarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
