import { NgModule } from '@angular/core';
import { EntityStatePipe, PageStatusPipe, ReadOnlyPipe, SiNoPipe, VoilaTranslatePipe, Permission } from './utility-pipe';

const PIPE = [
    PageStatusPipe,
    EntityStatePipe,
    Permission,
    ReadOnlyPipe,
    SiNoPipe,
    // tableInfoPipe,
    VoilaTranslatePipe
];

@NgModule({
    declarations: [...PIPE],
    imports: [],
    exports: [...PIPE]
})
export class UtilityPipeModule {}
