import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css'],
})
export class PostDialogComponent {
  postContent: string = ''; // Variable to store the input from the textarea
  selectedFile: File | null = null;
  userId: any; // current logged in user

  constructor(private postService: PostService, 
    private snackbar : MatSnackBar, private dialog : MatDialog) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.userId = localStorage.getItem('userId');

    if (this.postContent.trim() == '' && this.selectedFile == null) return;

    const formData = new FormData();
    if (this.selectedFile) {
      const fileSizeInMB = this.selectedFile.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 5) {
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'File size exceeds limit',
          text: 'Sorry, The file size must be less than 5MB.',
        });
        return; // Stop further execution
      }
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
    }
    
    formData.append('userId', this.userId.toString());
    formData.append('details', this.postContent);
    console.log(formData);
    console.log(this.postContent);

    this.snackbar.open("Posting Please Wait...");
    this.dialog.closeAll();

    this.postService.createPost(formData).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
          text: error.error
        });
        return throwError(error);
      }
    );
  }
}
function throwError(error: any): void {
  throw new Error('Function not implemented.');
}

