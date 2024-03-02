// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: any;

  constructor(private fb: FormBuilder, private userService : UserService, private router : Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  get email() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        const response = data as { token: string, userDto: any }; // Type assertion
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userDto.id.toString()); // Assuming id is a number
        localStorage.setItem('username', response.userDto.username);
        localStorage.setItem('email', response.userDto.email);

        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'An error occurred!',
        });
      }
    );
  }
  
}
