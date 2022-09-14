import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { FxConverterComponent } from './fx-converter.component';

describe('FxConverterComponent', () => {
  let component: FxConverterComponent;
  let fixture: ComponentFixture<FxConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FxConverterComponent ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FxConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
