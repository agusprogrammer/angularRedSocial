import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPublComponent } from './crear-publ.component';

describe('CrearPublComponent', () => {
  let component: CrearPublComponent;
  let fixture: ComponentFixture<CrearPublComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPublComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPublComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
