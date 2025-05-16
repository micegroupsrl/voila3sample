import { Component, Input, OnInit, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { ControlContainer, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTimepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { first, Subscription } from 'rxjs';

@Component({
    selector: 'timepicker',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TimepickerTestComponent)
        }
    ],
    templateUrl: './timepicker-base.component.html',
    styleUrls: ['./timepicker-base.component.scss']
})
export class TimepickerTestComponent implements OnInit, OnDestroy {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;
    @ViewChild(NgbTimepicker) picker!: NgbTimepicker;

    @Input() formControl!: FormControl;
    @Input() seconds!: string;
    @Input() formControlName!: string;
    @Input() label!: string;
    timePickerControl: FormControl = new FormControl();
    private subscriptions = new Subscription();

    //time!: NgbTimeStruct;

    constructor(private controlContainer: ControlContainer) {}
    onChange = (value: string | null) => {};
    // onChange!: (value: string) => void;
    onTouched = () => {};

    ngOnInit() {
        this.label = this.label || this.formControlName;
        this.timePickerControl.setValue(this.writeValue(this.control.value));
        
        this.subscriptions.add(
            this.control.valueChanges.pipe(first()).subscribe(value => {
                if (value) {
                    this.timePickerControl.setValue(this.writeValue(value));
                }
            })
        );

        this.subscriptions.add(
            this.timePickerControl.valueChanges.subscribe(value => {
                this.control.setValue(this.timeToString(value));
            })
        );
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }

    padWithZero(value: number): string {
        return value < 10 ? '0' + value : value + '';
    }

    timeToString(value: NgbTimeStruct) {
        let time: NgbTimeStruct = value;
        if (!time) {
            return '';
        }
        const timeParts = [];
        timeParts.push(this.padWithZero(time.hour));
        timeParts.push(this.padWithZero(time.minute));
        timeParts.push(this.padWithZero(time.second));

        return timeParts.join(':');
    }

    writeValue(obj: string): NgbTimeStruct | undefined {
        if (typeof obj === 'string') {
            let time: NgbTimeStruct;
            const timeParts = obj.split(':');
            time = {
                hour: +timeParts[0],
                minute: +timeParts[1],
                second: +timeParts[2]
            };
            return time;
        }
        return undefined;
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
