import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendsComponent } from './user-friends.component';

describe('UserFriendsComponent', () => {
  let component: UserFriendsComponent;
  let fixture: ComponentFixture<UserFriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFriendsComponent]
    });
    fixture = TestBed.createComponent(UserFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
