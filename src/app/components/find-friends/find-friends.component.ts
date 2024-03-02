import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { GET_FIND_FRINEDS } from 'src/app/graphql.operation';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit{

  users: any[] = []; // Use any[] type to represent an array of objects
  
  constructor(private apollo: Apollo, private userService : UserService, private snackbar : MatSnackBar) { }
  userId : any; // current logged in user


  ngOnInit(): void {
      this.userId = localStorage.getItem('userId');
      this.apollo.watchQuery({
        query: GET_FIND_FRINEDS,
        variables: {
          userId: this.userId
        }
      }).valueChanges.subscribe(({ data, error }: any) => {      
        if (data) {
          console.log(data);
          
          this.users = data.getAllUsers; // Assign the array of posts to 'this.posts'
        }
        console.log(error);
      });

  }

  addFriend(friendId: any) {
    // const userId = 10; // Replace 'your_user_id' with the actual user ID
    const friendRequest ={
      userId : this.userId,
      friendId : friendId
    }
    this.userService.sendFrinedRequest(friendRequest).subscribe(
      (data)=>{
        console.log(data);
        window.location.reload();
        this.snackbar.open("Friend Request send Successfully..")
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
