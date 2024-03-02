import { Injectable } from '@angular/core';
import { backendUrl } from '../config'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  

  constructor(private http : HttpClient) { }

  getUnreadNotificationCount(userId : any){
    return this.http.get(`${backendUrl}/api/v1/friend-zone/notification/unread/${userId}`);
  }

  readUnreadNotification(userId: any){
    return this.http.post(`${backendUrl}/api/v1/friend-zone/notification/read/${userId}`, null);
  }

  getAllNotifications(userId: any) {
    return this.http.get(`${backendUrl}/api/v1/friend-zone/notification/all/${userId}`);
  }
}
