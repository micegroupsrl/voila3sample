import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginGroupApiService } from '../services/services-login/login-group-api.service';
import { ILogin } from 'src/app/interfaces/login.interface';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    profileForm!: FormGroup;
    login!: ILogin;

    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });

    constructor(
        private loginGroupApiService: LoginGroupApiService,
        private overlaysService: OverlaysService,
        private cookieService: CookieService,
        private route: Router
    ) {}

    submit() {
        this.profileForm = this.loginForm;

        const login: ILogin = this.profileForm.value;
        this.loginGroupApiService.login.doLogin(login).subscribe((loginResult: ILogin) => {
            this.login = loginResult;
            if (this.login) {
                this.overlaysService.toast.showMessage('Login effettuato');
                console.log(this.login);
                this.cookieService.set('user', this.login.email + '/' + this.login.username + '/' + this.login.roles, 24 * 60 * 60);
                window.location.replace('/home');
            }
        });
    }
}
