import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarSocioComponent } from './dialog-editar-socio.component';

describe('DialogEditarSocioComponent', () => {
  let component: DialogEditarSocioComponent;
  let fixture: ComponentFixture<DialogEditarSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditarSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
