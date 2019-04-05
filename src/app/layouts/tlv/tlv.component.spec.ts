import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TLVComponent } from './tlv.component';

describe('TLVComponent', () => {
  let component: TLVComponent;
  let fixture: ComponentFixture<TLVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TLVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TLVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
