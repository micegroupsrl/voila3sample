import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform, Type, ɵstringify as stringify } from '@angular/core';

export function invalidPipeArgumentError(type: Type<any>, value: Object) {
    return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}
@Pipe({ name: 'camelCaseToText' })
export class CamelCaseToTextPipe extends TitleCasePipe implements PipeTransform {
    override transform(value: string): string;
    override transform(value: null | undefined): null;
    override transform(value: string | null | undefined): string | null;
    override transform(value: string | null | undefined): string | null {
        if (value == null) return null;
        if (typeof value !== 'string') {
            throw invalidPipeArgumentError(TitleCasePipe, value);
        }

        value = this.hasSpace(value) ? value : String(value).replace(/([A-Z])/g, g => ` ${g[0]}`);
        return super.transform(value);
    }

    private hasSpace(value: string): boolean {
        return value.indexOf(' ') >= 0;
    }
}
