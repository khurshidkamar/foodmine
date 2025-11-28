import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';


// This variable maintains the count of currently running HTTP requests across the application.
let pendingRequests = 0;

/**
 * Functional HTTP Interceptor for managing a global loading indicator.
 * It ensures the loading indicator is shown only during the first request and
 * hidden only after the very last request completes.
 */
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  // Inject the service using the modern `inject` function
  const loadingService = inject(LoadingService);

  // 1. Show Loading Logic (Start of Request)
  if (pendingRequests === 0) {
    // Only show loading if this is the first concurrent request
    loadingService.showLoading();
  }

  // Always increment the counter for the new request
  pendingRequests++;

  // 2. Handle the request
  return next(req).pipe(
    // 3. Hide Loading Logic (End of Request - Success or Error)
    finalize(() => {
      // Decrement the counter when the request completes (success, error, or cancellation)
      pendingRequests--;

      if (pendingRequests === 0) {
        // Only hide loading if there are no more pending requests
        loadingService.hideLoading();
      }
    })
  );
};