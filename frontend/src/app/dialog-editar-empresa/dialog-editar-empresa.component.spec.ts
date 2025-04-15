import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarEmpresaComponent } from './dialog-editar-empresa.component';

describe('DialogEditarEmpresaComponent', () => {
  let component: DialogEditarEmpresaComponent;
  let fixture: ComponentFixture<DialogEditarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditarEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
