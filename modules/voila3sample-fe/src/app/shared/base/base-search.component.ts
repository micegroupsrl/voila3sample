import { Component } from '@angular/core';

@Component({
    selector: 'base-search',
    template: ''
})
export class BaseSearchComponent {
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
}
