import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSelectedComponent } from './bet-selected.component';

describe('BetSelectedComponent', () => {
  let component: BetSelectedComponent;
  let fixture: ComponentFixture<BetSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
