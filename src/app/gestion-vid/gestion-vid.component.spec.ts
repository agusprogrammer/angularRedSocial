import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVidComponent } from './gestion-vid.component';

describe('GestionVidComponent', () => {
  let component: GestionVidComponent;
  let fixture: ComponentFixture<GestionVidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionVidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
