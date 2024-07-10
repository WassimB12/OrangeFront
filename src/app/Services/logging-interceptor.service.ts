import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Log the request body
    console.log('HTTP Request:', req);

    // Clone the request to add additional headers if needed
    const clonedRequest = req.clone();

    return next.handle(clonedRequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Log the response body if needed
          console.log('HTTP Response:', event);
        }
      }, error => {
        // Log the error if needed
        console.error('HTTP Error:', error);
      })
    );
  }
}
