import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAddComponent } from './empresa-add.component';

describe('EmpresaAddComponent', () => {
  let component: EmpresaAddComponent;
  let fixture: ComponentFixture<EmpresaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
