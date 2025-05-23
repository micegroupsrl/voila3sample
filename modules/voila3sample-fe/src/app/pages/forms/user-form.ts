import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function userForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        userId: [null, Validators.maxLength(20)],
        email: [null, Validators.compose([Validators.maxLength(80), Validators.email])],
        password: [null, Validators.maxLength(80)],
        username: [null, Validators.maxLength(80)],
        theRolePerUser: [[]]
    });
}
