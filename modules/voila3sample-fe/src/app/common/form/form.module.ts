import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PipesModule } from 'src/@shared/pipes';
import { MatButtonModule } from '@angular/material/button';

import { FieldGroupComponent } from './field-group.component';
import { DatepickerComponent } from './field/datepicker.component';
import { TimepickerComponent } from './field/timepicker.component';
import { InputNumberComponent } from './field/input-number.component';
import { InputPriceComponent } from './field/input-price.component';
import { InputTextComponent } from './field/input-text.component';
import { TextAreaComponent } from './field/textarea.component';
import { ToggleComponent } from './field/toggle.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { DataTimePickerComponent } from './field/datatimepicker.component';
import { TimepickerBootstrapComponent } from './field/timepicker-bootstrap.component';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTimePickerBaseComponent } from './field/datetimepicker-base.component';
import { TimepickerTestComponent } from 'src/app/common/form/field/timepicker-base.component';
import { PopupBaseComponent } from './field/popup.component';
import { TextFieldEditorComponent } from './field/text-field-editor.component';
import { CodeEditorModule } from '@ngstack/code-editor';
import { InputPasswordComponent } from './field/input-password.component';

export const COMPONENTS = [
    TextAreaComponent,
    InputTextComponent,
    InputNumberComponent,
    InputPriceComponent,
    DatepickerComponent,
    TimepickerComponent,

    ToggleComponent,
    FieldGroupComponent,
    DataTimePickerComponent,

    TimepickerBootstrapComponent,
    TimepickerTestComponent,
    DataTimePickerBaseComponent,
    TextFieldEditorComponent,

    PopupBaseComponent,

    InputPasswordComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        CodeEditorModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        PipesModule,
        MatIconModule,
        MatButtonModule,

        NgxMatTimepickerModule,
        NgbTimepickerModule,

        FlexLayoutModule
    ],
    exports: COMPONENTS
})
export class ResidFormModule {}
