import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisualizarSocioComponent } from './dialog-visualizar-socio.component';

describe('DialogVisualizarSocioComponent', () => {
  let component: DialogVisualizarSocioComponent;
  let fixture: ComponentFixture<DialogVisualizarSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogVisualizarSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVisualizarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
