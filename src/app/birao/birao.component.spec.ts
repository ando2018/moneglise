import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiraoComponent } from './birao.component';

describe('BiraoComponent', () => {
  let component: BiraoComponent;
  let fixture: ComponentFixture<BiraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiraoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
