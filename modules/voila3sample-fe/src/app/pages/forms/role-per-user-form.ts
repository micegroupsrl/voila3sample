import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function rolePerUserForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        roleId: [null, Validators.maxLength(80)],
        theRoleObjectKey: [null, Validators.required],
        theRoleObjectTitle: [null],
        userId: [null, Validators.maxLength(36)],
        theUserObjectKey: [null, Validators.required],
        theUserObjectTitle: [null]
    });
}
