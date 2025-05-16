import { Component, EventEmitter, forwardRef, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rsd-input-data',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true
        }
    ],
    styles: [':host {width: 100% !important;}', 'mat-form-field {width: 100%;}'],
    template: `
        <mat-form-field [appearance]="appearance">
            <mat-label>{{ label | camelCaseToText }}</mat-label>
            <input matInput [matDatepicker]="dp" [formControl]="control" />
            <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
            <mat-datepicker #dp color="primary"></mat-datepicker>
        </mat-form-field>
    `
})
export class DatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input() formControl!: FormControl;
    @Input() formControlName!: string;

    @Input() label!: string;
    @Input() required: boolean = false;
    @Input() appearance: MatFormFieldAppearance = 'outline';

    date!: Date;

    @Output() dateSelected = new EventEmitter<string>();

    onChange = (value: string) => {};
    onTouched = () => {};
    private subscriptions = new Subscription();

    addEventDate(event: any) {
        this.date = event;
        this.emitDate();
    }

    emitDate() {
        if (this.date) {
            const dateStr = this.formatDateAsString(this.date);
            this.dateSelected.emit(dateStr);
            this.onChange(dateStr);
        }
    }

    constructor(private controlContainer: ControlContainer) {}

    ngOnInit() {
        this.label = this.label || this.formControlName;

        let isUpdatingValue = false;

        this.subscriptions.add(
            this.control.valueChanges.subscribe(value => {
                if (!isUpdatingValue && value) {
                    isUpdatingValue = true;
                    this.addEventDate(value!);
                    isUpdatingValue = false;
                }
            })
        );
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }

    formatDateAsString(date: Date): string {
        return moment(date).format('YYYY-MM-DD');
    }

    public writeValue(obj: any): void {
        this.date = obj;
    }

    registerOnChange(fn: (value: string) => void): void {
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
