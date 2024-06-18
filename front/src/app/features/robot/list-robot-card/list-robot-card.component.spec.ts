import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRobotCardComponent } from './list-robot-card.component';

describe('CardComponent', () => {
  let component: ListRobotCardComponent;
  let fixture: ComponentFixture<ListRobotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRobotCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRobotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
