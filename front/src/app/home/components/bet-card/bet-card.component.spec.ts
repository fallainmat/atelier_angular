import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetCardComponent } from './bet-card.component';

describe('BetCardComponent', () => {
  let component: BetCardComponent;
  let fixture: ComponentFixture<BetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
