import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaPrivComponent } from './politica-priv.component';

describe('PoliticaPrivComponent', () => {
  let component: PoliticaPrivComponent;
  let fixture: ComponentFixture<PoliticaPrivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaPrivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
