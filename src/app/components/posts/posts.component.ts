import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from 'src/app/graphql.operation';
import { PostService } from 'src/app/service/post.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostLikedUsersDialogComponent } from '../post-liked-users-dialog/post-liked-users-dialog.component';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  postContent: string = '';
  searchQuery: any = null;
  searchType: any = null;

  postLikedUsers: string[] = [];

  pendingFriendsNumber: any;
  userId: any; // current logged in user
  currentLoggedInUsername: any;

  constructor(
    private apollo: Apollo,
    private postService: PostService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    private routerActive: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.userId = 10; // Replace 'your_user_id' with the actual user ID
    this.userId = localStorage.getItem('userId');
    this.currentLoggedInUsername = localStorage.getItem('username');

    this.notificationService.getUnreadNotificationCount(this.userId).subscribe(
      (data: any) => {
        localStorage.setItem('unreadNotifications', data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.routerActive.queryParams.subscribe((params) => {
      this.searchQuery = params['query'] || '';
      this.searchType = params['type'];
      // Now you have access to the search query in this.searchQuery
      console.log('in post component', this.searchQuery);
      console.log('searching type', this.searchType);
      if (this.searchQuery && this.searchType) {
        this.userService.searching(this.searchQuery, this.searchType).subscribe(
          (data) => {
            console.log(data);
            this.posts = data;
            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.getAllPosts();
      }
    });

    this.postService.getPendingFriends(this.userId).subscribe((data: any) => {
      // Specify the type as any
      if (Array.isArray(data)) {
        // Ensure data is an array
        const pendingFriendsLength = data.length; // Get the length of the array
        localStorage.setItem('pendingFriends', pendingFriendsLength.toString()); // Store the length as a string
      } else {
        console.error('Data received is not an array');
      }
    });
  }

  getAllPosts() {
    this.apollo
      .watchQuery({
        query: GET_POSTS,
        variables: {
          userId: this.userId,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        if (data) {
          this.posts = data.getFriendsPost; // Assign the array of posts to 'this.posts'
          this.postLikedUsers = data.getFriendsPost.postLikedUsers;
        }
        console.log(error);
      });
  }

  openDialog(): void {
    this.dialog.open(PostDialogComponent, {});
  }

  postClicked(postId: any) {
    // Navigate to post-details component with postId as URL parameter
    this.router.navigate(['/post-details'], { queryParams: { post: postId } });
  }

  likedPosts = new Set<any>(); // Set to store liked postIds
  dislikePosts = new Set<any>();

  async addLike(post: any): Promise<void> {
    const postRequest = {
      userId: this.userId,
      postId: post.postId,
    };

    if (this.isPostLiked(post)) {
      this.likedPosts.delete(post.postId);
      this.dislikePost(postRequest);
      return;
    }

    try {
      await this.postService.likePost(postRequest).toPromise();
      // Add the postId to the likedPosts set upon successful like
      this.likedPosts.add(post.postId);
    } catch (error) {
      console.log(error);
    }
  }

  dislikePost(postRequest: any) {
    this.postService.dislikePost(postRequest).subscribe(
      (data: any) => {
        this.dislikePosts.add(postRequest.postId);
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

  currentDisLike(post: any) {
    return this.dislikePosts.has(post.postId);
  }

  handleLikesClick(postId: any) {
    // Pass the postId to the dialog component when opening it
    this.dialog.open(PostLikedUsersDialogComponent, {
      data: { postId: postId }, // Pass the postId as data to the dialog
    });
  }
}
