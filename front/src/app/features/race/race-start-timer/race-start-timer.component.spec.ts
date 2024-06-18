import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStartTimerComponent } from './race-start-timer.component';

describe('RaceStartTimerComponent', () => {
  let component: RaceStartTimerComponent;
  let fixture: ComponentFixture<RaceStartTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceStartTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceStartTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
