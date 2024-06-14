import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaryComponent } from './sary.component';

describe('SaryComponent', () => {
  let component: SaryComponent;
  let fixture: ComponentFixture<SaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
