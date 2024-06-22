import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceBotComponent } from './race-bot.component';

describe('RaceBotComponent', () => {
  let component: RaceBotComponent;
  let fixture: ComponentFixture<RaceBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
