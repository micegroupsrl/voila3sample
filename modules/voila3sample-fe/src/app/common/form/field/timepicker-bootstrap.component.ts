import { Component, EventEmitter, forwardRef, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { NgbTimepicker, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rsd-input-time-ngb',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TimepickerBootstrapComponent)
        },
        NgbTimepickerConfig
    ],
    styles: [':host {width: 100% !important;}', 'mat-form-field {width: 100%;}'],
    template: `
        <mat-label [hidden]="true"
            ><small>{{ label | camelCaseToText }}</small></mat-label
        >
        <ngb-timepicker class="bootstrap-style form-control ngb-tp" [formControl]="control" [seconds]="true" [spinners]="false"> </ngb-timepicker>
    `
})
export class TimepickerBootstrapComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @ViewChild(NgbTimepicker) timePicker!: NgbTimepicker;

    @Input() formControl!: FormControl;
    @Input() formControlName!: string;

    @Input() label!: string;
    @Input() suffix!: string;
    @Input() required: boolean = false;
    @Input() appearance: MatFormFieldAppearance = 'outline';

    time!: NgbTimeStruct;

    @Output() timeSelected = new EventEmitter<string>();

    onChange = (value: string | null) => {};
    // onChange!: (value: string) => void;
    onTouched = () => {};
    private subscriptions = new Subscription();

    addEventTime(event: any) {
        this.time = event;
        this.emitTime();
    }

    emitTime() {
        if (this.time) {
            let timeStr = '';
            if (typeof this.time != 'string') timeStr = this.formatTimeAsString(this.time);
            else timeStr = this.time;
            this.timeSelected.emit(timeStr);
            this.onChange(timeStr);
            this.onTouched();
        } else {
            this.onChange('');
            this.onTouched();
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
                    this.addEventTime(value!);
                    isUpdatingValue = false;
                }
            })
        );
    }

    ngAfterViewInit() {
        this.timePicker.writeValue(this.time);
    }

    get value() {
        return this.formatTimeAsString(this.time);
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }

    formatTimeAsString(time: NgbTimeStruct): string {
        if (!time) {
            return '';
        }
        const timeParts = [];
        if (time.hour !== undefined && time.minute !== undefined) {
            timeParts.push(this.padWithZero(time.hour));
            timeParts.push(this.padWithZero(time.minute));
            if (time.second !== undefined) {
                timeParts.push(this.padWithZero(time.second));
            }
        }
        return timeParts.join(':');
    }

    padWithZero(value: number): string {
        return value < 10 ? '0' + value : value + '';
    }

    writeValue(obj: any): void {
        let timeStruct!: NgbTimeStruct;
        if (obj != undefined && obj != '') {
            if (typeof obj === 'string') {
                const timeParts = obj.split(':');
                if (timeParts.length === 3) {
                    timeStruct = {
                        hour: +timeParts[0],
                        minute: +timeParts[1],
                        second: +timeParts[2]
                    };
                }
            } else if (typeof obj === 'object') {
                timeStruct = obj;
            }
            const timeStr = this.formatTimeAsString(timeStruct);
            this.timeSelected.emit(timeStr);
            this.onChange(timeStr);
            this.time = timeStruct;
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
    
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this.subscriptions.unsubscribe();
    }
}
