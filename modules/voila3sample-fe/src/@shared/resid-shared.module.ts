import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [PipesModule, MatSnackBarModule],
    exports: [PipesModule]
})
export class ResidSharedModule {
    static forRoot() {
        return {
            ngModule: ResidSharedModule
        };
    }
}
