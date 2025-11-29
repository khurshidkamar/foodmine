import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../../services/user.service';


/**
 * Functional Route Guard for Authentication.
 * This guard prevents access to routes if the user is not logged in 
 * (i.e., does not have a user token).
 */
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  // Use 'inject' to get service dependencies instead of constructor injection
  const userService = inject(UserService);
  const router = inject(Router);

  // Check if the current user has a token (indicating they are logged in)
  if (userService.currentUser.token) {
    return true; // Allow access
  }

  // If not logged in, navigate to the login page
  // The 'queryParams' are used to store the original URL so the user can be redirected 
  // back after a successful login (the 'returnUrl' logic).
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

  return false; // Prevent access to the route
};