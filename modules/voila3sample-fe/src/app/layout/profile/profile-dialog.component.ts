import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { LoginGroupApiService } from 'src/app/pages/services/services-login/login-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-profile-dialog',
    templateUrl: './profile-dialog.component.html',
    styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit, OnDestroy {
    user: any = {
        email: String,
        username: String
    };
    protected logged: boolean = false;

    private subscriptions = new Subscription();

    constructor(
        private loginGroupApiService: LoginGroupApiService,
        private cookieService: CookieService,
        private overlaysService: OverlaysService,
        private _mdr: MatDialogRef<ProfileDialogComponent>,
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

    logout() {
        this.subscriptions.add(
            this.loginGroupApiService.logout().subscribe(
                () => {
                    this.overlaysService.toast.showMessage('Logout effettuato');
                    console.log(loginResult);
                    this.cookieService.deleteAll();
                    window.location.reload();
                },
                () => {
                    // Handle error
                }
            )
        );
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
