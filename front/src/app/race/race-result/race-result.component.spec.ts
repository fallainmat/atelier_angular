import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceResultComponent } from './race-result.component';

describe('RaceResultComponent', () => {
  let component: RaceResultComponent;
  let fixture: ComponentFixture<RaceResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
