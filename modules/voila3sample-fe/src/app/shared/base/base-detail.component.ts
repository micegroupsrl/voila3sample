import { Component } from '@angular/core';

@Component({
    selector: 'base-detail',
    template: ''
})
export class BaseDetailComponent {
    public labelName: string[] = ['undefined', 'false', 'true'];

    getBoolSliderValue(n: number) {
        switch (n) {
            case 0: {
                return undefined;
            }
            case 1: {
                return false;
            }
            case 2: {
                return true;
            }
            default: {
                return undefined;
            }
        }
    }

    passNumberSliderValue(b: boolean) {
        switch (b) {
            case undefined: {
                return 0;
            }
            case false: {
                return 1;
            }
            case true: {
                return 2;
            }
            default: {
                return undefined;
            }
        }
    }
}
