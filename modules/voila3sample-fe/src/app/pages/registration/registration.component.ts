import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { RegistrationGroupApiService } from '../services/services-registration/registration-group-api.service';
import { IUser } from '../interfaces/user.interface';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    profileForm!: FormGroup;
    regis!: IUser;

    userForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        email: new FormControl(''),
        role: new FormControl(null)
    });

    constructor(
        private registrationGroupApiService: RegistrationGroupApiService,
        private overlaysService: OverlaysService
    ) {}

    register() {
        this.profileForm = this.userForm;

        const regis: IUser = this.profileForm.value;

        this.registrationGroupApiService.registration.doRegistration(regis).subscribe((regisResult: IUser) => {
            this.regis = regisResult;
            if (this.regis) {
                this.overlaysService.toast.showMessage('Registrazione effettuata');
            }
        });

        console.log(this.profileForm.get('username')?.value);
        console.log(this.profileForm.get('password')?.value);
    }
}
