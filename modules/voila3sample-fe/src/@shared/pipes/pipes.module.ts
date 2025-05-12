import { NgModule } from '@angular/core';

import { BooleanPipe } from './boolean.pipe';
import { CamelCaseToTextPipe } from './camelCaseToText.pipe';
import { DefaultDatePipe } from './default-date.pipe';
import { EuroPipe } from './euro.pipe';
import { IconPipe } from './icon.pipe';
import { NoOpsPipe } from './no-ops.pipe';
import { RoleTruncatePipe } from './role-truncate.pipe';

const COMPONENTS = [DefaultDatePipe, BooleanPipe, IconPipe, BooleanPipe, RoleTruncatePipe, CamelCaseToTextPipe, EuroPipe, NoOpsPipe];
@NgModule({
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PipesModule {}
