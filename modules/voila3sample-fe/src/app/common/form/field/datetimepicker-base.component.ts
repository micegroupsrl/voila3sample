import { Component, EventEmitter, forwardRef, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControlDirective, FormControl, ControlContainer, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

@Component({
    selector: 'datetimepicker',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DataTimePickerBaseComponent)
        }
    ],
    styles: [],
    template: `
        <div [formGroup]="formDatetime" fxLayout="row" fxLayout.xs="column" fxLayoutGap="10" fxLayoutGap.xs="20">
            <rsd-input-data formControlName="selectedDate" [appearance]="appearance" [label]="label"></rsd-input-data>
            <timepicker formControlName="selectedTime"></timepicker>
        </div>
    `
})
export class DataTimePickerBaseComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @ViewChild(MatInput, { static: false }) datetimeInput!: MatInput;

    @Input() formControl!: FormControl;
    @Input() formControlName!: string;
    @Input() appearance: MatFormFieldAppearance = 'outline';
    @Input() label!: string;

    formDatetime!: FormGroup;
    forma!: FormGroup;

    selectedDate!: string;
    // Inizializzazione timepicker a 00:00:00
    selectedTime = '00:00:00';

    @Output() dateTimeSelected = new EventEmitter<string | null>();

    onChange = (value: string | null) => {};
    onTouched = () => {};
    private subscriptions = new Subscription();

    constructor(
        public controlContainer: ControlContainer,
        public fb: FormBuilder
    ) {}

    emitDateTime() {
        const dateTime = this.getDateAndTime(this.selectedDate, this.selectedTime);
        this.dateTimeSelected.emit(dateTime);
        this.onChange(dateTime);
    }

    ngOnInit() {
        this.label = this.label || this.formControlName;

        this.formDatetime = this.fb.group({
            selectedDate: this.selectedDate,
            selectedTime: this.selectedTime
        });

        // Osservatore per catturare le modifiche al datapicker
        this.subscriptions.add(
            this.formDatetime.get('selectedDate')?.valueChanges.subscribe(date => {
                this.selectedDate = date;
                this.emitDateTime();
            })
        );

        // Osservatore per catturare le modifiche al timepicker
        this.subscriptions.add(
            this.formDatetime.get('selectedTime')?.valueChanges.subscribe(time => {
                this.selectedTime = time;
                this.emitDateTime();
            })
        );
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }

    // Metodo che unisce date e time in un'unica stringa, se date è null datatime sarà null
    getDateAndTime(date: string, time: string): string | null {
        if (date == null) {
            return null;
        }
        if (!time) {
            time = '00:00:00';
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
    
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this.subscriptions.unsubscribe();
    }
}
