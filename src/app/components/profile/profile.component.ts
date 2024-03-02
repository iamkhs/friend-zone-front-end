import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  GET_POSTS,
  GET_POSTS_BY_USERNAME,
  GET_USER_BY_USERNAME,
} from 'src/app/graphql.operation';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { PostService } from 'src/app/service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { PostLikedUsersDialogComponent } from '../post-liked-users-dialog/post-liked-users-dialog.component';
import { UpdatePostDialogComponent } from '../update-post-dialog/update-post-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  coverImageUrl: File | null | string | ArrayBuffer = null;
  profileImageUrl: File | string | ArrayBuffer | null =
    '/assets/default-user.png';
  username!: string | null;

  UserDetails: any;
  posts: any[] = []; // Define the posts property as an array

  postLikedUsers: string[] = [];

  friendsUsername: string[] = [];

  currentLoggedUser: boolean = false;
  isFriend: boolean = false;

  currentLoggedInUsername: any;
  userId: any;
  friendshipStatus: any;
  showUserFriendsComponent: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private dialog: MatDialog,
    public userService: UserService,
    public postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');

    this.userId = localStorage.getItem('userId');
    this.currentLoggedInUsername = localStorage.getItem('username');
    const currentUserString = localStorage.getItem('currentUser');

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      if (this.username === currentUser.username) {
          this.currentLoggedUser = true;
      }
    } else {
        // Use this.username to fetch user info from the backend
        this.userService.getCurrentLoggedUser().subscribe((data: any) => {
          // Assuming data is returned as an object
          localStorage.setItem('currentUser', JSON.stringify(data));

          if (this.username === data.username) {
            this.currentLoggedUser = true;
          } else {
            this.currentLoggedUser = false;
          }
        });
      }

    // Subscribe to queries and fetch data
    this.fetchUserData();
    this.fetchUserPosts();

    if (this.coverImageUrl) {
      console.log(this.coverImageUrl);
    }
  }

  // Fetch user data using Apollo GraphQL
  fetchUserData(): void {
    this.apollo
      .watchQuery({
        query: GET_USER_BY_USERNAME,
        variables: { username: this.username },
      })
      .valueChanges.subscribe(
        ({ data, error }: any) => {
          if (error) {
            // Handle the error
            this.handleError(error);
            return; // Stop execution here if there's an error
          }

          if (data) {
            this.UserDetails = data.getUserByUsername;
            this.fetchUserPosts();
            this.getFriendshipStatus(this.UserDetails);
          }
        },
        (error) => {
          // Handle any subscription errors
          console.error('Subscription error:', error);
          // Handle the error
          this.handleError(error);
        }
      );
  }

  getFriendshipStatus(userDetails: any) {
    if (this.userId != userDetails.id) {
      this.userService
        .getFriendshipStatus(this.userId, userDetails.id)
        .subscribe(
          (data) => {
            this.friendshipStatus = data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  private handleError(error: any): void {
    // Perform error handling based on your application's requirements
    if (error) {
      this.router.navigate(['/']);
      this.snackBar.open('Invalid Url!', 'Dismiss', {
        duration: 5000, // Adjust duration as needed
      });
    }
  }

  // Fetch user posts using Apollo GraphQL
  fetchUserPosts(): void {
    this.apollo
      .watchQuery({
        query: GET_POSTS_BY_USERNAME,
        variables: { username: this.username },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        if (data) {
          this.posts = data.getPostByUsername;
          this.postLikedUsers = data.getPostByUsername.getPostByUsername;
        }
        if (error) {
          console.log(error);
        }
      });
  }

  onProfilePicSelect(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log(file);
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 5) {
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'File size exceeds limit',
          text: 'Sorry, The file size must be less than 5MB.',
        });
        return; // Stop further execution
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profileImageUrl = reader.result;
      };

      const formData = new FormData();
      formData.append('profilePic', file);
      this.snackBar.open('Upoloading Profile pic, Please Wait..');

      this.userService.uploadProfilePic(this.username, formData).subscribe(
        (data) => {
          if (data) {
            window.location.reload();
          }
        },
        (error) => {
          console.log(error);
          if (error) {
            this.snackBar.open('Failed to Upload the Pic!!!!', 'Dismiss', {
              duration: 5000,
            });
          }
        }
      );
    }
  }

  onCoverPicSelect(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log(file);
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 5) {
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'File size exceeds limit',
          text: 'Sorry, The file size must be less than 5MB.',
        });
        return; // Stop further execution
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.coverImageUrl = reader.result;
      };

      const formData = new FormData();
      formData.append('coverPic', file);
      this.snackBar.open('Upoloading Cover pic, Please Wait..');

      this.userService.uploadCoverPic(this.username, formData).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            window.location.reload();
          }
        },
        (error) => {
          console.log(error);
          if (error) {
            this.snackBar.open(
              'Failed to Upload the Cover Pic!!!!',
              'Dismiss',
              {
                duration: 5000,
              }
            );
          }
        }
      );
    }
  }

  // Open post dialog
  openDialog(): void {
    this.dialog.open(PostDialogComponent);
  }

  // Handle post click
  postClicked(postId: any): void {
    console.log('post clicked', postId);
    // Navigate to post-details component with postId as URL parameter
    this.router.navigate(['/post-details'], { queryParams: { post: postId } });
  }

  deletePost(postId: any) {
    console.log(postId, 'clicked');
    this.postService.deletePostById(postId).subscribe(
      (data: any) => {
        const url = '/' + this.username;
        window.location.href = url;
        this.snackBar.open(data.value);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleFriendAction(friendId: any): void {
    switch (this.friendshipStatus) {
      case 'PENDING':
        this.declineFriendRequest(friendId);
        break;
      case 'ACCEPTED':
        this.unfriend(friendId);
        break;
      default:
        this.addFriend(friendId, this.userId);
        break;
    }
  }

  unfriend(friendId: any): void {
    console.log('unfriend method call');
    const friendRequest = {
      userId: this.userId,
      friendId: friendId,
    };

    console.log(friendRequest);
    this.userService.unfriendRequest(friendRequest).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addFriend(friendId: any, userId: any): void {
    const friendRequest = {
      userId: userId,
      friendId: friendId,
    };
    this.userService.sendFrinedRequest(friendRequest).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Friend Request Sent...');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  declineFriendRequest(friendId: any): void {
    console.log(friendId);
    console.log('decline method call');

    // Add logic to decline the friend request from the friend with the given ID
  }

  likedPosts = new Set<any>(); // Set to store liked postIds

  addLike(postId: any): void {
    const postRequest = {
      userId: this.userId,
      postId: postId,
    };

    this.postService.likePost(postRequest).subscribe(
      (data) => {
        console.log(data);
        // Add the postId to the likedPosts set upon successful like
        this.likedPosts.add(postId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isPostLiked(post: any): boolean {
    // Check if the current user's username exists in the postLikedUsers array
    return post.postLikedUsers.includes(this.currentLoggedInUsername);
  }

  currentLike(post: any): boolean {
    // Check if the postId exists in the likedPosts set
    return this.likedPosts.has(post.postId);
  }

  handleLikesClick(postId: any) {
    // Pass the postId to the dialog component when opening it
    this.dialog.open(PostLikedUsersDialogComponent, {
      data: { postId: postId }, // Pass the postId as data to the dialog
    });
  }

  updatePost(postId: any) {
    this.dialog.open(UpdatePostDialogComponent, {
      data: { postId: postId }, // Pass the postId as data to the dialog
    });
  }

  showFriends() {
    this.showUserFriendsComponent = true;
    this.router.navigate(['friends'], { relativeTo: this.route });
  }

  gototimeline() {
    const url = '/' + this.username;
    window.location.href = url;
  }
}
