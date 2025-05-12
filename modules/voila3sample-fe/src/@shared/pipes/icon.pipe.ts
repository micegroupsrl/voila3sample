import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'icon'
})
export class IconPipe implements PipeTransform {
    transform(contentType: string): any {
        if (contentType.startsWith('image')) {
            return 'image';
        }
        if (contentType.startsWith('application')) {
            return 'document';
        }
        if (contentType.startsWith('text')) {
            return 'document';
        }

        return contentType;
    }
}
