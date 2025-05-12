import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'rsd-input-text',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputTextComponent)
        }
    ],
    styles: [':host {width: 100% !important;}', 'mat-form-field {width: 100%;}'],
    template: `
        <mat-form-field [appearance]="appearance">
            <mat-label>{{ label | camelCaseToText }}</mat-label>
            <input matInput [formControl]="$any(control)" type="text" [required]="required" />
            <mat-icon matSuffix class="secondary-text" *ngIf="iconSuffix">{{ iconSuffix }}</mat-icon>
            <span matSuffix *ngIf="suffix">{{ suffix }}</span>
        </mat-form-field>
    `
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input() formControlName!: string;

    @Input() label!: string;
    @Input() suffix!: string;
    @Input() iconSuffix!: string;
    @Input() required: boolean = false;
    @Input() appearance: MatFormFieldAppearance = 'outline';

    constructor(private controlContainer: ControlContainer) {}

    ngOnInit() {
        this.label = this.label || this.formControlName;
    }

    get control() {
        return this.controlContainer.control!.get(this.formControlName);
    }

    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor!.registerOnTouched(fn);
    }

    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor!.registerOnChange(fn);
    }

    writeValue(obj: any): void {
        this.formControlDirective.valueAccessor!.writeValue(obj);
    }

    setDisabledState(isDisabled: boolean): void {
        this.formControlDirective.valueAccessor!.setDisabledState?.(isDisabled);
    }
}
