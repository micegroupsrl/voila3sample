import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'rsd-input-time',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TimepickerComponent)
        }
    ],
    styles: [':host {width: 100% !important;}', 'mat-form-field {width: 100%;}'],
    template: `
        <mat-form-field [appearance]="appearance">
            <mat-label>{{ label | camelCaseToText }}</mat-label>
            <input matInput [ngxMatTimepicker]="tp" [formControl]="control" [format]="24" [disableClick]="true" [placeholder]="'00:00'" readonly />

            <ngx-mat-timepicker-toggle matSuffix (click)="openPicker()" [disabled]="disableToggle"></ngx-mat-timepicker-toggle>
            <ngx-mat-timepicker #tp (timeSet)="updateTime($event)"></ngx-mat-timepicker>
        </mat-form-field>
    `
})
export class TimepickerComponent implements OnInit, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @ViewChild('tp') timepicker: any;

    @Input() formControl!: FormControl;
    @Input() formControlName!: string;

    @Input() label!: string;
    @Input() required: boolean = false;
    @Input() disableToggle!: boolean;
    @Input() appearance: MatFormFieldAppearance = 'outline';

    constructor(private controlContainer: ControlContainer) {}

    ngOnInit() {
        this.label = this.label || this.formControlName;
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }

    updateTime($event: string): void {
        console.info('TIME SET', $event);
        (this as any)[this.formControlName] = $event;
    }

    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnTouched(fn);
    }

    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnChange(fn);
    }

    writeValue(obj: any): void {
        if (!obj) {
            this.formControlDirective.valueAccessor?.writeValue(obj);
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.formControlDirective.valueAccessor?.setDisabledState?.(isDisabled);
    }

    openPicker() {
        if (this.disableToggle) {
            return;
        }
        this.timepicker.open();
    }
}
