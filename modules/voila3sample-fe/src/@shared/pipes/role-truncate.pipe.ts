import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roleTruncate'
})
export class RoleTruncatePipe implements PipeTransform {
    transform(value: string): string {
        return value.substring(5, value.length);
    }
}
