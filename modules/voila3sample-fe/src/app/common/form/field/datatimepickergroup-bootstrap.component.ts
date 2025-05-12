import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControlDirective, FormControl, ControlContainer, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'rsd-input-data-time-bootstrap-group',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DataTimePickerGroupBootstrapComponent)
        }
    ],
    styles: [],
    template: `
        <div [formGroup]="formDatetime" fxLayout="row" fxLayout.xs="column" fxLayoutGap="10" fxLayoutGap.xs="20">
            <rsd-input-data formControlName="selectedDate" [appearance]="appearance"></rsd-input-data>
            <rsd-input-time-ngb formControlName="selectedTime"></rsd-input-time-ngb>
        </div>
    `
})
export class DataTimePickerGroupBootstrapComponent implements OnInit, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @ViewChild(MatInput, { static: false }) datetimeInput!: MatInput;

    @Input() formControl!: FormControl;
    @Input() formControlName!: string;
    @Input() appearance: MatFormFieldAppearance = 'outline';

    formDatetime!: FormGroup;

    selectedDate: string = '';
    // Inizializzazione timepicker a 00:00:00
    selectedTime: string = '00:00:00';

    @Output() dateTimeSelected = new EventEmitter<string | null>();

    onChange = (value: string | null) => {};
    onTouched = () => {};

    emitDateTime() {
        const dateTime = this.getDateAndTime(this.selectedDate, this.selectedTime);
        this.dateTimeSelected.emit(dateTime);
        this.onChange(dateTime);
    }

    constructor(
        public controlContainer: ControlContainer,
        public fb: FormBuilder
    ) {}

    ngOnInit() {
        this.formDatetime = this.fb.group({
            selectedDate: this.selectedDate,
            selectedTime: { value: this.selectedTime, disabled: true }
        });

        // Osservatore per catturare le modifiche al datapicker
        // Controlla se la data è nulla e abilita/disabilita il timepicker all'occorrenza
        this.formDatetime.get('selectedDate')?.valueChanges.subscribe(date => {
            this.selectedDate = date;
            if (date == null) {
                this.formDatetime.get('selectedTime')?.disable();
            } else {
                this.formDatetime.get('selectedTime')?.enable();
            }
            this.emitDateTime();
        });

        // Osservatore per catturare le modifiche al timepicker
        this.formDatetime.get('selectedTime')?.valueChanges.subscribe(time => {
            this.selectedTime = time;
            this.emitDateTime();
        });
    }

    get value() {
        return this.getDateAndTime(this.selectedDate, this.selectedTime);
    }

    // Metodo che unisce date e time in un'unica stringa, se date è null datatime sarà null
    getDateAndTime(date: string, time: string): string | null {
        if (date == null) {
            return null;
        }
        return date + 'T' + time;
    }

    writeValue(obj: any): void {
        if (typeof obj == 'string') {
            const [date, time] = obj.split('T');
            this.selectedDate = date;
            this.selectedTime = time.split('.')[0];
            this.formDatetime.controls['selectedDate'].setValue(date);
            this.formDatetime.controls['selectedTime'].setValue(time.split('.')[0]);
        }
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
}
