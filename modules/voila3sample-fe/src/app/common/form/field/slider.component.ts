import { Component, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Configurable slider
 */
@Component({
    selector: 'rsd-slider',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SliderConfigurableExample)
        }
    ],
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, MatCheckboxModule, MatSliderModule, CommonModule, ReactiveFormsModule]
})
export class SliderConfigurableExample implements OnInit, ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;
    @Input() formControl!: FormControl;
    @Input() formControlName!: string;
    @Input() label!: string;
    @Input() labelName!: string[];
    @Input() value!: string;
    @Input() labelPosition: any = 'before';

    onChange = (value: number) => {};
    onTouched = () => {};

    constructor(private controlContainer: ControlContainer) {}

    ngOnInit() {
        this.label = this.label || this.formControlName;
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }

    writeValue(obj: any): void {
        this.formControlDirective.valueAccessor!.writeValue(obj);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.formControlDirective.valueAccessor!.setDisabledState?.(isDisabled);
    }
}
