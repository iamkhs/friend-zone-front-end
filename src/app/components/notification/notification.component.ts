import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  constructor(private notificationService : NotificationService,
     private router : Router){}

  notifications : any [] = [];

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.notificationService.getAllNotifications(userId).subscribe(
      (data : any)=>{
        console.log(data);
        this.notifications = data;
        
        if(data){
          this.notificationService.readUnreadNotification(userId).subscribe(
            (data)=>{
              console.log(data);
              localStorage.removeItem('unreadNotifications')
            },
            (error)=>{
              console.log(error);
            }
          )
        }
      }
    )
  }

  handalingNotificationMethod(notification: any) {
    const notificationType = notification.notificationType;
    const contentId = notification.contentId;
    if(notificationType === 'COMMENT' || notificationType === 'LIKEPOST'){
      this.router.navigate(['/post-details'], { queryParams: { post:  contentId} });
    }
    
  }

}
