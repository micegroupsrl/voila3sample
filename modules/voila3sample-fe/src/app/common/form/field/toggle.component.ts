import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'rsd-toggle',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ToggleComponent)
        }
    ],
    styles: ['mat-form-field {width: 100%;}'],
    template: `
        <mat-slide-toggle #toggle [formControl]="control" [labelPosition]="labelPosition" [color]="color">
            <h3>{{ toggle.checked ? labelOn : labelOff }}</h3>
        </mat-slide-toggle>
    `
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input() formControl!: FormControl;
    @Input() formControlName!: string;
    @Input() labelPosition: any = 'before';
    @Input() color: string = 'primary';

    @Input() label!: string;

    @Input() labelOn!: string;
    @Input() labelOff!: string;

    constructor(private controlContainer: ControlContainer) {}

    ngOnInit() {
        if (!this.labelOn && !this.labelOff) {
            this.label = this.label || this.formControlName;
        }
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
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
