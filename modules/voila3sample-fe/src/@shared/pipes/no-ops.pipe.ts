import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noOps'
})
export class NoOpsPipe implements PipeTransform {
    transform(value: any): string {
        return value;
    }
}
