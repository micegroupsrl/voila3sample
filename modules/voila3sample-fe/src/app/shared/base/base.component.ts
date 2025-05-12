import { Component } from '@angular/core';
import { ToastrService } from 'src/app/utilities/services/toastr.service';
import { FormGroup } from '@angular/forms';
import { GenericDetailComponent } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-base',
    template: ''
})
export class BaseComponent extends GenericDetailComponent {
    PATH_VIEW: string = '/view';
    PATH_EDIT: string = '/edit';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public errors: any = {};

    public validTabs(smartValidation: boolean, toastrService: ToastrService): boolean {
        if (!smartValidation) {
            return true;
        }
        return false;
    }

    public min(n1: number, n2: number): number {
        return Math.min(n1, n2);
    }

    public hasError(form: FormGroup, formControlName: string, key: string) {
        //return BzControlUtils.hasError(form, formControlName, key);
        // to do...
    }
}
