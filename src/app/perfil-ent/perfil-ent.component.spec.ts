import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEntComponent } from './perfil-ent.component';

describe('PerfilEntComponent', () => {
  let component: PerfilEntComponent;
  let fixture: ComponentFixture<PerfilEntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilEntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
