import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error.error);
        // Unauthorized or Forbidden status
        // this.router.navigate(['/login']);
        // localStorage.clear();
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
          text: error.error
        });
        return throwError(error);
      })
    );
  }
}
