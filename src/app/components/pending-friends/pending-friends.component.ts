import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-pending-friends',
  templateUrl: './pending-friends.component.html',
  styleUrls: ['./pending-friends.component.css']
})
export class PendingFriendsComponent implements OnInit{


  pendingFriends: any[] = []; // Use any[] type to represent an array of objects

  constructor(private userService: UserService) { }

  userId : any; // current logged in user

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    this.userService.getPendingFriends(this.userId).subscribe(
      (data) => {
        this.pendingFriends = data as any[]; // Typecast data to any[] typ
        console.log(this.pendingFriends);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  acceptFriend(id : any) {
    const friendRequest ={
        userId : this.userId,
        friendId : id,
    }
    console.log(friendRequest);
    this.userService.acceptFriend(friendRequest).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
    window.location.reload();
  }

  declineFriend(id: any) {
    const friendRequest ={
      userId : this.userId,
      friendId : id,
    }

    this.userService.declineFriendRequest(friendRequest).subscribe(
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