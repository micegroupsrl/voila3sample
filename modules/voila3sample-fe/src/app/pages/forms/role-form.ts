import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function roleForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        roleId: [null, Validators.compose([Validators.maxLength(80), Validators.required])],
        name: [null, Validators.maxLength(80)],
        theRoleRoleGroupObjectKey: [null],
        theRoleRoleGroupObjectTitle: [null],
        thePrivilegePerRole: [[]],
        theRolePerUser: [[]],
        theRoleRoleChild: [[]]
    });
}
