import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromptSelectComponent } from './prompt-select.component';
import { MatButtonModule } from '@angular/material/button';

describe('PromptSelectComponent', () => {
  let component: PromptSelectComponent;
  let fixture: ComponentFixture<PromptSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatButtonModule],
      declarations: [ PromptSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
