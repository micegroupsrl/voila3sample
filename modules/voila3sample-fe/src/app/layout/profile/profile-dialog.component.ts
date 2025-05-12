import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { LoginGroupApiService } from 'src/app/pages/services/services-login/login-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'profile-dialog',
    templateUrl: './profile-dialog.component.html'
})
export class ProfileDialog {
    user: any = {
        email: String,
        username: String
    };
    protected logged: boolean = false;

    constructor(
        private loginGroupApiService: LoginGroupApiService,
        private cookieService: CookieService,
        private overlaysService: OverlaysService,
        private _mdr: MatDialogRef<ProfileDialog>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        let user = cookieService.get('user').split('/');
        this.user.username = user[1];
        this.user.email = user[0];
        this.logged = this.loginGroupApiService.login.logged;
    }

    ngOnInit() {
        const matDialogConfig = new MatDialogConfig();

        matDialogConfig.position = { right: `10px`, top: `70px` };
        this._mdr.updatePosition(matDialogConfig.position);
    }

    CloseDialog() {
        this._mdr.close(false);
    }
    public logout() {
        this.loginGroupApiService.login.doLogout().subscribe((loginResult: String) => {
            if (loginResult == "You've been signed out!") {
                this.overlaysService.toast.showMessage('Logout effettuato');
                console.log(loginResult);
                this.cookieService.deleteAll();
                //.delete('voila3sampleCookie', '/', 'localhost', undefined, 'Lax');
                window.location.reload();
                //this.router.navigate(['/login'])
            }
        });
    }
}
