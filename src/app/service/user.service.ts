import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from '../config'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http : HttpClient) { }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  getLoggedUsername(){
    return localStorage.getItem("username");
  }

  logoutUser(){
    localStorage.clear();
  }
  

  getPendingFriends(userId:any){
    return this.http.get(`${backendUrl}/api/v1/friend-zone/friendship/pending-friends/${userId}`)
  }

  acceptFriend(friendRequest : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/friendship/accept-request`, friendRequest);
  }

  declineFriendRequest(friendRequest : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/friendship/decline-request`, friendRequest);
  }

  unfriendRequest(friendRequest : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/friendship/unfriend`, friendRequest);
  }

  sendFrinedRequest(friendRequest : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/friendship/send-request`, friendRequest);
  }

  signupUser(userDetails : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/user/signup`, userDetails);
  }

  uploadProfilePic(username : any, profilePic : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/user/profile-pic-upload/${username}`, profilePic)
  }

  uploadCoverPic(username : any, coverPic : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/user/cover-pic-upload/${username}`, coverPic)
  }

  loginUser(loginRequest : any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/auth/login`, loginRequest);
  }

  getCurrentLoggedUser(){
    return this.http.get(`${backendUrl}/api/v1/friend-zone/user/current-logged-user`);
  }

  getUserAllFriends(userId: any){
    return this.http.get(`${backendUrl}/api/v1/friend-zone/friendship/all-friends/${userId}`);
  }

  getFriendshipStatus(userId : any, friendId : any){
    return this.http.get(`${backendUrl}/api/v1/friend-zone/friendship/status/${userId}/${friendId}`);
  }

  searching(query: string, type: string): Observable<any> {
    // Construct the URL parameters
    let params = new HttpParams();
    params = params.append('query', query);
    params = params.append('type', type);

    // Send the GET request with URL parameters
    return this.http.get(`${backendUrl}/api/v1/friend-zone/search/`, { params });
  }
}
