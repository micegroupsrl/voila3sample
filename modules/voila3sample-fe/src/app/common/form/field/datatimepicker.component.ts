import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControlDirective, FormControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'rsd-input-data-time',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DataTimePickerComponent),
            multi: true
        }
    ],
    styles: [':host {width: 100% !important;}'],
    template: `
        <div [formGroup]="$any(control)" fxLayout="row" fxLayout.xs="column" fxLayoutGap="24" fxLayoutGap.xs="20">
            <rsd-input-data formControlName="date" [label]="labelData"></rsd-input-data>
            <rsd-input-time formControlName="time" [label]="labelOra" [disableToggle]="disableToggle"></rsd-input-time>
        </div>
    `
})
export class DataTimePickerComponent implements OnInit, ControlValueAccessor {
    //Control per entrambi
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input() groupName!: string;
    @Input() formControl!: FormControl;
    @Input() formControlName!: string;
    @Input() disableToggle!: boolean;

    @Input() labelData!: string;
    @Input() labelOra!: string;

    constructor(public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.labelData = this.labelData || this.formControlName;
        this.labelOra = this.labelOra || this.formControlName;
    }

    get control() {
        return this.controlContainer.control!.get(this.groupName);
    }

    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnTouched(fn);
    }

    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnChange(fn);
    }

    writeValue(obj: any): void {
        this.formControlDirective.valueAccessor?.writeValue(obj);
    }

    setDisabledState(isDisabled: boolean): void {
        this.formControlDirective.valueAccessor?.setDisabledState?.(isDisabled);
    }
}
