import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusLayerComponent } from './focus-layer.component';

describe('FocusLayerComponent', () => {
  let component: FocusLayerComponent;
  let fixture: ComponentFixture<FocusLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
