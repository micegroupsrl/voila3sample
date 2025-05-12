import { Component, Input } from '@angular/core';

@Component({
    selector: 'cnt-field-group',
    template: `
        <div class="pb-16 pt-16" fxLayout="row" fxLayoutAlign="start center">
            <mat-icon class="m-0 mr-16 accent-800-fg">{{ icon }}</mat-icon>
            <div class="h3 secondary-text accent-800-fg">{{ text }}</div>
        </div>
        <ng-content></ng-content>
    `
})
export class FieldGroupComponent {
    @Input() icon!: string;
    @Input() text!: string;
}
