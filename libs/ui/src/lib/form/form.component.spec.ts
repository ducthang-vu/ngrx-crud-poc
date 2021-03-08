import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatInputModule, ReactiveFormsModule],
      declarations: [FormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with no default value', () => {
    const values = component.form.getRawValue();
    const expected = {
      title: '',
      author: '',
      country: '',
      language: '',
      link: '',
      pages: '',
      year: ''
    }
    expect(values).toEqual(expected);
  });

  it('with selected book should have default value', () => {
    component.selected = {
      id: 'mock',
      title: 'mock',
      author: 'mock',
      pages: 100,
      country: 'mock',
      language: 'mock',
      link: 'mock',
      year: 1990
    };
    const expected = {
      title: 'mock',
      author: 'mock',
      pages: 100,
      country: 'mock',
      language: 'mock',
      link: 'mock',
      year: 1990
    };
    component.ngOnInit();
    const values = component.form.getRawValue();
    expect(values).toEqual(expected);
  });
});
