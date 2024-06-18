import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceViewHeaderComponent } from './race-view-header.component';

describe('RaceViewHeaderComponent', () => {
  let component: RaceViewHeaderComponent;
  let fixture: ComponentFixture<RaceViewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceViewHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
