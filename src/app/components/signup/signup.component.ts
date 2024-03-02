import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  userDetails: any = {};
  selectedFile: File | null = null; // New variable to keep track of the selected file

  constructor(private userService : UserService, private router : Router) {}
  
  ngOnInit(): void {
    localStorage.clear();
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
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
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
      formData.append('firstName', this.userDetails.firstName);
      formData.append('lastName', this.userDetails.lastName);
      formData.append('username', this.userDetails.username);
      formData.append('password', this.userDetails.password);
      formData.append('email', this.userDetails.email);
      formData.append('phone', this.userDetails.phone);
  
      this.userService.signupUser(formData).subscribe(
        (data) => {
          // Display success message using SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User signed up successfully!',
          });

          this.router.navigate(['/success'])
        },
        (error) => {
          // Display error message using SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'An error occurred!',
          });
        }
      );
    } else {
      console.log("Form is not valid");
      // Display validation error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all the required fields!',
      });
    }
  }
  

  avatarUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = event.target.files[0];
    if (file) {
      this.userDetails.avatar = file; // Assign the selected file directly to userDetails.avatar

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatarUrl = reader.result;
      };
    }
  }
}