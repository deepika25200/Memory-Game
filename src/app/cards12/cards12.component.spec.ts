import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cards12Component } from './cards12.component';

describe('Cards12Component', () => {
  let component: Cards12Component;
  let fixture: ComponentFixture<Cards12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cards12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cards12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
