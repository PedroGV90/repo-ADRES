import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdquisicionComponent } from './editar-adquisicion.component';

describe('EditarAdquisicionComponent', () => {
  let component: EditarAdquisicionComponent;
  let fixture: ComponentFixture<EditarAdquisicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAdquisicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAdquisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
