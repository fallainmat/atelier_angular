import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceViewComponent } from './race-view.component';

describe('RaceViewComponent', () => {
  let component: RaceViewComponent;
  let fixture: ComponentFixture<RaceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
