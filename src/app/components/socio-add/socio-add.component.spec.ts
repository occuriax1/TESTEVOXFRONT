import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioAddComponent } from './socio-add.component';

describe('SocioAddComponent', () => {
  let component: SocioAddComponent;
  let fixture: ComponentFixture<SocioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocioAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
