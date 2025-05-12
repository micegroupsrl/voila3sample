import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'defaultDate'
})
export class DefaultDatePipe extends DatePipe implements PipeTransform {
    override transform(value: any, format?: string, timezone?: string, locale?: string): any {
        return super.transform(value, format ? format : 'dd/MM/yyyy', timezone, locale);
    }
}
