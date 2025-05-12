import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { SecurityService } from '@micegroup/voila2-runtime-ng';

// Responsive app
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppAuthGuard } from './app.authguard';
import { buildPrivilegesEnum } from './security/privilege';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    // Responsive app
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private securityService: SecurityService,
        private cookieService: CookieService,
        private router: Router,
        private authService: AppAuthGuard
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

    ngOnInit() {
        if (environment.securityOn) {
            buildPrivilegesEnum();
            if (!this.cookieService.check('voila3sampleCookie') || !this.cookieService.check('user')) {
                this.router.navigate(['/login']);
            }
        }
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }
    getUserRoles(): any {
        return this.authService.roles;
    }
}
