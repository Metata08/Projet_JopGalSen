import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['requiredRole'];
    const userRole = this.authService.getUserRole();
    
    if (userRole !== requiredRole) {
      this.authService.redirectToDefaultRoute();
      return false;
    }
    
    return true;
  }
}