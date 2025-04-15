import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisualizarEmpresaComponent } from './dialog-visualizar-empresa.component';

describe('DialogVisualizarEmpresaComponent', () => {
  let component: DialogVisualizarEmpresaComponent;
  let fixture: ComponentFixture<DialogVisualizarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogVisualizarEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVisualizarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
