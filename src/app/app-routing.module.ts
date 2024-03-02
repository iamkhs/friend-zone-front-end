import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingFriendsComponent } from './components/pending-friends/pending-friends.component';
import { PostsComponent } from './components/posts/posts.component';
import { FindFriendsComponent } from './components/find-friends/find-friends.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { NotificationComponent } from './components/notification/notification.component';
import { UserFriendsComponent } from './components/user-friends/user-friends.component';

const routes: Routes = [

  {
    path: '',
    component: PostsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'search',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },


  {
    path: 'pending-friends',
    component: PendingFriendsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'notifications',
    component: NotificationComponent,
    pathMatch:'full',
    canActivate : [AuthGuard]
  },

  {
    path: 'find-friends',
    component: FindFriendsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },

  {
    path: 'post-details',
    component: PostDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },

  {
    path: ':username',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'friends',
        component: UserFriendsComponent
      }
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
