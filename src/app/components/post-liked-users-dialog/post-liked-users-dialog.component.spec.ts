import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikedUsersDialogComponent } from './post-liked-users-dialog.component';

describe('PostLikedUsersDialogComponent', () => {
  let component: PostLikedUsersDialogComponent;
  let fixture: ComponentFixture<PostLikedUsersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostLikedUsersDialogComponent]
    });
    fixture = TestBed.createComponent(PostLikedUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
