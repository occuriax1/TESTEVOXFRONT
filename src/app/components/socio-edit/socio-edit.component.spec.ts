import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioEditComponent } from './socio-edit.component';

describe('SocioEditComponent', () => {
  let component: SocioEditComponent;
  let fixture: ComponentFixture<SocioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocioEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
