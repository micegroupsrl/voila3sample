import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function privilegeForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        privilegeId: [null, Validators.compose([Validators.maxLength(20), Validators.required])],
        name: [null, Validators.maxLength(80)],
        description: [null, Validators.maxLength(80)],
        thePrivilegePerRole: [[]]
    });
}
