import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  constructor(private router : Router, public userService : UserService, private dialog : MatDialog){}
  username : any;

  ngOnInit(): void {
    this.username = this.userService.getLoggedUsername();
    this.getBadgeNumber();
  }

  getBadgeNumber(): number {
    const badgeNumber = localStorage.getItem('pendingFriends');
    
    if (badgeNumber !== null) {
      // Parse the badge number as a number (assuming it's stored as a string)
      return parseInt(badgeNumber, 10);
    } else {
      // Handle the case where the value is null (e.g., return a default value)
      return 0; // or any other default value
    }
  }

  getUnreadNotificationCount(){
    const unreadNotification =  localStorage.getItem('unreadNotifications');
    if(unreadNotification){
      return parseInt(unreadNotification) || 0;
    }
    return null;
  }

  gotoProfile() {
    const username = localStorage.getItem('username');
    if (username) {
      const url = '/' + username;
      window.location.href = url;
    } else {
      // Handle the case where username is not available in localStorage
      console.log('Username not found in localStorage');
    }
  }

  logout() {
    this.userService.logoutUser();
    window.location.href = '/login'
  }

  openSearchDialog() {
    this.dialog.open(SearchDialogComponent)
  }
    
}
