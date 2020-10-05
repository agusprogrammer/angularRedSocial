import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirVidComponent } from './subir-vid.component';

describe('SubirVidComponent', () => {
  let component: SubirVidComponent;
  let fixture: ComponentFixture<SubirVidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirVidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
