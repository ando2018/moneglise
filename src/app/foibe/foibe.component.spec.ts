import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoibeComponent } from './foibe.component';

describe('FoibeComponent', () => {
  let component: FoibeComponent;
  let fixture: ComponentFixture<FoibeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoibeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoibeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
