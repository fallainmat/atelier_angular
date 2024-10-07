import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserModel, UserService } from './core/service/user/user.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: UserService, useValue: {
            getCurrentUser: () => of<UserModel>({
                id: 42,
                firstname: 'John',
                lastname: 'Doe',
                email: 'j.doe@nowhere.com',
                money: 123456
              }
            )
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
