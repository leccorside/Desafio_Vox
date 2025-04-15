import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarSocioComponent } from './dialog-criar-socio.component';

describe('DialogCriarSocioComponent', () => {
  let component: DialogCriarSocioComponent;
  let fixture: ComponentFixture<DialogCriarSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCriarSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCriarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
