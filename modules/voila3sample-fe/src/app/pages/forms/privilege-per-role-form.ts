import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function privilegePerRoleForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        roleId: [null, Validators.maxLength(80)],
        theRoleObjectKey: [null, Validators.required],
        theRoleObjectTitle: [null],
        privilegeId: [null],
        thePrivilegeObjectKey: [null, Validators.required],
        thePrivilegeObjectTitle: [null]
    });
}
