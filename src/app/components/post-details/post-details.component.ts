import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_POST_BY_ID } from 'src/app/graphql.operation';
import { CommentService } from 'src/app/service/comment.service';
import { UpdatePostDialogComponent } from '../update-post-dialog/update-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit{

  postId!: string;
  post : any;
  newComment : string | undefined;

  username : any;

  constructor(private route: ActivatedRoute, private apollo : Apollo,
    private commentService : CommentService,
    private dialog: MatDialog,
    ) { }

  userId : any; // current loggedIn user

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem("username");
    console.log(this.username);
    

    this.route.queryParams.subscribe(params => {
      this.postId = params['post'];
      this.apollo.watchQuery({
        query: GET_POST_BY_ID,
        variables:{
          postId: this.postId
        }
      }).valueChanges.subscribe(({ data, error}: any)=>{
        if(data){
          this.post = data.getPostById;
        }
        console.log(error);
      })
    });
  }

  addComment(postId : any) {
    console.log(this.newComment);
    if(this.newComment == null || this.newComment?.trim() === '' ){
      return;
    }
    const commentRequest = {
      body : this.newComment,
      userId : this.userId
    }

    this.commentService.addComment(postId, commentRequest).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
    window.location.reload();
  }

  editComment(commentId: any) {
    this.dialog.open(UpdatePostDialogComponent, {
      data: { commentId: commentId } // Pass the postId as data to the dialog
  });
  }

  deleteComment(commentId: any) {
    this.commentService.deleteComment(commentId).subscribe(
      (data)=>{
        console.log(data);
        window.location.reload();
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
