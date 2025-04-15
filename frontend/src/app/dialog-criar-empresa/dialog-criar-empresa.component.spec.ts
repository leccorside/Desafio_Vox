import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarEmpresaComponent } from './dialog-criar-empresa.component';

describe('DialogCriarEmpresaComponent', () => {
  let component: DialogCriarEmpresaComponent;
  let fixture: ComponentFixture<DialogCriarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCriarEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCriarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
