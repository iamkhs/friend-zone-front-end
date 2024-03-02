import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_POST_LIKED_USERS } from 'src/app/graphql.operation';

@Component({
  selector: 'app-post-liked-users-dialog',
  templateUrl: './post-liked-users-dialog.component.html',
  styleUrls: ['./post-liked-users-dialog.component.css'],
})
export class PostLikedUsersDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apollo: Apollo,
    private dialogRef: MatDialogRef<PostLikedUsersDialogComponent>,
    private router : Router
  ) {}

  likedUsers: any[] = [];

  ngOnInit(): void {
    // Access the passed postId
    this.apollo
      .watchQuery({
        query: GET_POST_LIKED_USERS,
        variables: {
          postId: this.data.postId,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        if (data) {
          this.likedUsers = data.getPostLikedUsers;
        }
        console.log(error);
      });
  }

  navigateToUserProfile(username: string): void {
    window.location.href = '/' + username;
  }

  // Function to close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  
}
