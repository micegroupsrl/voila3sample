import { Injectable } from '@angular/core';
import { TranslateService } from '@micegroup/voila2-translate-ng';

@Injectable()
export class VoilaTranslateService extends TranslateService {
    /**
     * Overrides
     */
    override instant(key: string | Array<string>, interpolateParams?: Object): string | any {
        const tmp: { [key: string]: string } = {};
        if (interpolateParams) {
            Object.entries(interpolateParams).forEach(([k, v]) => {
                tmp[k] = super.instant(v);
            });
            return super.instant(key, tmp);
        } else {
            return super.instant(key, interpolateParams);
        }
    }

    public resolveMessage(m: any, ms: string): string {
        let args: string[] = [];
        args.push(this.resolveField(m.objectName + '.' + m.field, ms));
        for (let argument of m.arguments) {
            args.push(argument);
        }
        for (let code of m.codes) {
            let key: string = 'errors.' + code;
            let msg: string = super.instant(key, args);
            if (msg != key) {
                return msg;
            }
        }
        return m.errorMessage;
    }

    resolveEntity(field: string, ms: string) {
        return this.resolveField(field + '.labels', ms);
    }

    resolveField(field: string, ms: string) {
        let fieldKey: string = ms + '.detail.' + field;
        let fieldName: string = this.instant(fieldKey);
        if (fieldName != fieldKey) {
            return fieldName;
        } else {
            return field;
        }
    }
}
