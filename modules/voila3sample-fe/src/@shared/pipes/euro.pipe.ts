import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

type disp = 'code' | 'symbol' | 'symbol-narrow' | string | boolean;

@Pipe({
    name: 'euro'
})
export class EuroPipe extends CurrencyPipe implements PipeTransform {
    override transform(value: number | string, currencyCode?: string, display?: disp, digitsInfo?: string, locale?: string): string | null;
    override transform(value: null | undefined, currencyCode?: string, display?: disp, digitsInfo?: string, locale?: string): null;
    override transform(value: number | string | null | undefined, currencyCode?: string, display?: disp, digitsInfo?: string, locale?: string): string | null;
    override transform(value: any, digitsInfo: string = '0.0-0', locale: string = 'it'): string | null {
        return super.transform(value, 'EUR', 'symbol', digitsInfo, locale);
    }
}
