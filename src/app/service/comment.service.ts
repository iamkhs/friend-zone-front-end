import { Injectable } from '@angular/core';
import { backendUrl } from '../config'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  addComment(postId : any, commentRequest : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/post/comment/${postId}`, commentRequest);
  }
  
  deleteComment(commentId: any) {
    return this.http.delete(`${backendUrl}/api/v1/friend-zone/post/comment/delete/${commentId}`);
  }

}
