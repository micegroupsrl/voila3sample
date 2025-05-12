import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@micegroup/voila2-translate-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { UtilityPipeModule } from 'src/app/utilities/pipe/utility-pipe.module';

import { ResidSharedModule } from 'src/@shared';
import { ResidFormModule } from 'src/app/common/form/form.module';
import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider';
import { SliderConfigurableExample } from 'src/app/common/form/field/slider.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [],
    imports: [SliderConfigurableExample, NgMultiSelectDropDownModule.forRoot(), CdkDrag, CdkDragHandle],
    exports: [
        CdkDragHandle,
        CdkDrag,
        NgMultiSelectDropDownModule,
        CommonModule,
        UtilityPipeModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,

        MatTableModule, // <-- Added Table Module
        MatPaginatorModule, // <-- Added Paginator Module
        MatProgressBarModule, // <-- Added Loader Module
        MatSortModule,
        MatCardModule,
        MatInputModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule,
        MatTreeModule,
        MatBadgeModule,
        MatTooltipModule,
        MatTabsModule,
        MatSelectModule,
        MatMomentDateModule,
        FlexLayoutModule,
        MatSnackBarModule,
        MatGridListModule,
        MatSliderModule,
        SliderConfigurableExample,
        //TIMEPICKER
        NgxMatTimepickerModule, // <-- Modulo per TimePicker esterno
        //NgxMatTimepickerModule.setLocale('it-IT'),
        NgbTimepickerModule,

        //RESID
        ResidSharedModule,
        ResidFormModule,
        NgbModule
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' }]
})
export class SharedModule {}
