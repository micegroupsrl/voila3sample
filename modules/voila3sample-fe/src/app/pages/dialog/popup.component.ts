import { Component, forwardRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControlDirective, FormControl, ControlContainer, NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'popup-test',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => PopupBaseComponent)
        }
    ],
    styles: [],
    template: `
        <mat-form-field appearance="outline" style="width: 100%">
            <input matInput [value]="name.value" [placeholder]="placeholder" />
        </mat-form-field>
    `
})
export class PopupBaseComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input() formControl!: FormControl;
    @Input() formControlName!: string;
    @Input() label!: string;
    @Input() placeholder!: string;
    @Input() value!: FormControl;

    onChange = (value: string | null) => {};
    onTouched = () => {};
    private subscriptions = new Subscription();

    constructor(
        public controlContainer: ControlContainer,
        public fb: FormBuilder
    ) {}

    ngOnInit() {
        this.label = this.label || this.formControlName;
        this.subscriptions.add(
            this.control.valueChanges.subscribe(value => {
                this.name.setValue(value);
            })
        );
    }

    get control() {
        return this.value || this.controlContainer.control!.get(this.value);
    }
    get name() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }

    writeValue(obj: any): void {
        this.formControlDirective.valueAccessor?.writeValue(obj);
    }

    registerOnChange(fn: (value: string | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.formControlDirective.valueAccessor?.setDisabledState?.(isDisabled);
    }
    
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this.subscriptions.unsubscribe();
    }
}
