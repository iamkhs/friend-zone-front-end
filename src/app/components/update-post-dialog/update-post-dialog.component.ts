import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { GET_POST_BY_ID } from 'src/app/graphql.operation';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-update-post-dialog',
  templateUrl: './update-post-dialog.component.html',
  styleUrls: ['./update-post-dialog.component.css'],
})
export class UpdatePostDialogComponent implements OnInit {
  postContent: string = ''; // Variable to store the input from the textarea
  userId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apollo: Apollo,
    private dialogRef: MatDialogRef<UpdatePostDialogComponent>,
    private postService: PostService
  ) {}

  postId: any;
  commentId: any;

  ngOnInit(): void {
    this.postId = this.data.postId;
    this.commentId = this.data.commentId;

    this.userId = localStorage.getItem('userId');
    console.log(this.userId);

    if (this.postId) {
      this.apollo
        .watchQuery({
          query: GET_POST_BY_ID,
          variables: {
            postId: this.postId,
          },
        })
        .valueChanges.subscribe(({ data, error }: any) => {
          if (data) {
            this.postContent = data.getPostById.postDetails;
            console.log(this.postContent);
          }
          console.log(error);
        });
    }

    if (this.commentId) {
      console.log('comment id is ', this.commentId);
      this.postService.getCommentById(this.commentId).subscribe(
        (data: any) => {
          this.postContent = data.body;
          console.log(this.postContent);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  onSubmit() {
    const updatePostRequest = {
      details: this.postContent,
      userId: this.userId,
    };

    if (this.postId) {
      this.postService.updatePost(this.postId, updatePostRequest).subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close();
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if(this.commentId){
      const commentRequest ={
        body: this.postContent,
        userId : this.userId
      }

      this.postService.updateComment(this.commentId, commentRequest).subscribe(
        (data)=>{
          window.location.reload();          
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }
}
