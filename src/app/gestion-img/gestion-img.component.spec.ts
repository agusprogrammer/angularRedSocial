import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionImgComponent } from './gestion-img.component';

describe('GestionImgComponent', () => {
  let component: GestionImgComponent;
  let fixture: ComponentFixture<GestionImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
