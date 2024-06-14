import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterowComponent } from './daterow.component';

describe('DaterowComponent', () => {
  let component: DaterowComponent;
  let fixture: ComponentFixture<DaterowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaterowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaterowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
