import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBettingComponent } from './list-betting.component';

describe('ListBettingComponent', () => {
  let component: ListBettingComponent;
  let fixture: ComponentFixture<ListBettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
