import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../../services/user.service';


/**
 * Functional HTTP Interceptor for authentication.
 * It adds the user's access token to the request headers if the user is logged in.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Use 'inject' to get service dependencies
  const userService = inject(UserService);

  const user = userService.currentUser;

  // Check if the user has a token
  if (user.token) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      }
    });
  }

  // Continue the request chain
  return next(req);
};