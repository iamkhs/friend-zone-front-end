import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './components/posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { PendingFriendsComponent } from './components/pending-friends/pending-friends.component';
import { FindFriendsComponent } from './components/find-friends/find-friends.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import { SignupComponent } from './components/signup/signup.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { PostDetailsComponent } from './components/post-details/post-details.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './jwt.interceptor';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PostLikedUsersDialogComponent } from './components/post-liked-users-dialog/post-liked-users-dialog.component';
import { UpdatePostDialogComponent } from './components/update-post-dialog/update-post-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NotificationComponent } from './components/notification/notification.component';
import {MatListModule} from '@angular/material/list';
import { UserFriendsComponent } from './components/user-friends/user-friends.component';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavigationComponent,
    PendingFriendsComponent,
    FindFriendsComponent,
    PostDialogComponent,
    SignupComponent,
    PostDetailsComponent,
    ProfileComponent,
    LoginComponent,
    PostLikedUsersDialogComponent,
    UpdatePostDialogComponent,
    NotificationComponent,
    UserFriendsComponent,
    SearchDialogComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatListModule,
    MatRadioModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
    
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
