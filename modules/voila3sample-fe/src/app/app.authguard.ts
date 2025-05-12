import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { buildPrivilegesEnum } from './security/privilege';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

//build the enum privileges for let us able to get their value
buildPrivilegesEnum();

@Injectable()
export class AppAuthGuard implements CanActivate {
    roles: string[] | undefined;
    visibility: string[] | undefined;
    constructor(
        protected router: Router,
        private cookieService: CookieService
    ) {
        if (this.cookieService.check('voila3sampleCookie') || this.cookieService.check('user')) {
            let user = cookieService.get('user').split('/');
            this.roles = user[2]?.split(',').map(priv => priv.replace('ROLE_', ''));
            this.visibility = this.roles;
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isAccessAllowed(route, state);
    }

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let permission = false;
            if (!environment.securityOn) {
                permission = true;
                return resolve(permission);
            }
            if (!this.cookieService.check('voila3sampleCookie') || !this.cookieService.check('user')) {
                this.router.navigate(['/login']);
                return reject(false);
            }
            const requiredRoles: string[] = route.data['privileges'];
            this.visibility = this.roles;
            if (!requiredRoles || requiredRoles.length === 0 || requiredRoles.every(role => this.roles!.includes(role))) {
                permission = true;
            }
            if (!permission) {
                this.router.navigate(['/']);
            }
            resolve(permission);
        });
    }
}
