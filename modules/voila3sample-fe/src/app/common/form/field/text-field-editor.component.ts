import { Component, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlContainer, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeModel } from '@ngstack/code-editor';
import { first } from 'rxjs';

@Component({
    selector: 'text-editor',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TextFieldEditorComponent)
        }
    ],
    templateUrl: './text-field-editor.component.html',
    styleUrls: ['./text-field-editor.component.scss']
})
export class TextFieldEditorComponent implements OnInit {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input() activeTheme = 'vs';
    @Input() readOnly = false;
    @Input() formControlName!: string;
    @Input() formControl!: FormControl;

    onChange = (value: string | null) => {};
    // onChange!: (value: string) => void;
    onTouched = () => {};

    constructor(private controlContainer: ControlContainer) {}

    onValueChanges(obj: any): void {
        this.control.setValue(obj);
    }

    writeValue(obj: any): void {
        //this.textControl.setValue(obj)
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        //this.formControlDirective.valueAccessor!.setDisabledState?.(isDisabled);
    }

    model!: CodeModel;

    options = {
        contextmenu: true,
        minimap: {
            enabled: true
        }
    };

    ngOnInit(): void {
        this.control.valueChanges.pipe(first()).subscribe(value => {
            if (value == null) {
                this.model = {
                    language: 'html',
                    uri: 'main.html',
                    value: '',
                    dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
                };
            }

            if (value != null) {
                this.model = {
                    language: 'html',
                    uri: 'main.html',
                    value: value,
                    dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
                };
            }
        });
    }

    get control() {
        return this.formControl || this.controlContainer.control!.get(this.formControlName);
    }
}
