import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { VoilaTranslateService } from './voila-translate.service';
import { SnackBarAnnotatedComponent } from 'src/app/common/form/field/snack-bar-component';

@Injectable({
    providedIn: 'root'
})
export class ToastrService {
    private _DANGER_DURATION: number = 5000;
    private durationInSeconds = 5;
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private snackBar: MatSnackBar,
        private translateService: VoilaTranslateService
    ) {
        // private translateService: VoilaTranslateService
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, '', { duration: this.durationInSeconds * 1000, verticalPosition: this.verticalPosition });
    }

    public showDanger(message: string, args?: any): void {
        message = this.translateService.instant(message, args);
        this.snackBar.openFromComponent(SnackBarAnnotatedComponent, {
            duration: this._DANGER_DURATION,
            data: message
        });
    }

    public showMessage(message: string, args?: any): void {
        message = this.translateService.instant(message, args);
        this.snackBar.openFromComponent(SnackBarAnnotatedComponent, {
            duration: this.durationInSeconds * 1000,
            data: message
        });
    }
}
