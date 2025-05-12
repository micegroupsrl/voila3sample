import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarRef, MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'snack-bar-annotated-component-example-snack',
    template: `<span matSnackBarLabel>
            {{ data }}
        </span>
        <span matSnackBarActions>
            <button mat-icon-button class="white-icon" matSnackBarAction (click)="snackBarRef.dismissWithAction()"><mat-icon>cancel</mat-icon></button>
        </span>`,
    styles: [
        `
            :host {
                display: flex;
            }
            .white-icon {
                color: white;
            }
        `
    ],
    standalone: true,
    imports: [MatButtonModule, MatSnackBarModule, MatIconModule]
})
export class SnackBarAnnotatedComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
    snackBarRef = inject(MatSnackBarRef);
}
