import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDialogSelectComponent } from './app-dialog-select.component';

describe('AppDialogSelectComponent', () => {
  let component: AppDialogSelectComponent;
  let fixture: ComponentFixture<AppDialogSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDialogSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDialogSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
