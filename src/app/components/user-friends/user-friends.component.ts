import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit{

  constructor(private userService : UserService){}
  userId : any;
  userFriends : any[] = [];

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userService.getUserAllFriends(this.userId).subscribe(
      (data : any)=>{
        console.log(data);
        this.userFriends = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }


  unfriend(friendId: any): void {
    console.log("unfriend method call");
    const friendRequest = {
      userId: this.userId,
      friendId: friendId
    }

    console.log(friendRequest);
    this.userService.unfriendRequest(friendRequest).subscribe(
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
