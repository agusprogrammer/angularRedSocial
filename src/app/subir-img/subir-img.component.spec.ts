import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirImgComponent } from './subir-img.component';

describe('SubirImgComponent', () => {
  let component: SubirImgComponent;
  let fixture: ComponentFixture<SubirImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
