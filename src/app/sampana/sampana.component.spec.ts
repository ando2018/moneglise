import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampanaComponent } from './sampana.component';

describe('SampanaComponent', () => {
  let component: SampanaComponent;
  let fixture: ComponentFixture<SampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampanaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
