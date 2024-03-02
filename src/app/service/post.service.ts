import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http : HttpClient) { }

  createPost(postRequset: any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/post`, postRequset);
  }

  getPendingFriends(userId: any){
    return this.http.get(`${backendUrl}/api/v1/friend-zone/friendship/pending-friends/${userId}`);
  }

  deletePostById(postId : any){
    return this.http.delete(`${backendUrl}/api/v1/friend-zone/post/delete/${postId}`);
  }

  likePost(postRequest: any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/post/like-post`, postRequest);
  }

  dislikePost(postRequest : any){
    console.log("dislike service");
    console.log(postRequest);
    
    return this.http.post(`${backendUrl}/api/v1/friend-zone/post/dislike-post`, postRequest);
  }

  updatePost(postId : any, newPost : any){
    return this.http.put(`${backendUrl}/api/v1/friend-zone/post/update-post/${postId}`, newPost)
  }

  getCommentById(commentId: any) {
    return this.http.get(`${backendUrl}/api/v1/friend-zone/post/comment/${commentId}`)
  }

  updateComment(commentId: any, commentRequest: any) {
    return this.http.put(`${backendUrl}/api/v1/friend-zone/post/comment/update/${commentId}`, commentRequest)
  }
}
