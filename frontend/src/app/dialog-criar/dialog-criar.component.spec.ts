import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarComponent } from './dialog-criar.component';

describe('DialogCriarComponent', () => {
  let component: DialogCriarComponent;
  let fixture: ComponentFixture<DialogCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCriarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
