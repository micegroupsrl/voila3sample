import { Pipe, PipeTransform } from '@angular/core';
import { PageStatus } from '../enum/page-status.enum';
import { VoilaTranslateService } from '../services/voila-translate.service';
import { AppAuthGuard } from 'src/app/app.authguard';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'hasPageStatus'
})
export class PageStatusPipe {
    public transform(pageStatus: string, status: string[] | string): boolean {
        if (status.length != 0) {
            for (let s of status) {
                const element = s;
                if (pageStatus === element) return true;
            }
        }
        if (status) {
            if (pageStatus === status) return true;
        }
        return false;
    }
}

@Pipe({
    name: 'hasEntityState'
})
export class EntityStatePipe {
    public transform(entityState: string, status: string): boolean {
        if (status) {
            if (entityState === status) return true;
        }
        return false;
    }
}

// @Pipe({
//     name: 'hasPermission'
// })
// export class PermissionPipe  {

//     public transform(element: any, expectedElementList: any[] | any): boolean {
//         if(environment.securityOn)
//            return isEquals(element, expectedElementList);
//         return true;
//     }
// }

@Pipe({
    name: 'isReadOnly'
})
export class ReadOnlyPipe {
    public transform(pageStatus: string, isReadOnly: boolean): boolean {
        if (pageStatus === PageStatus.NEW && isReadOnly) return false;
        return true;
    }
}

@Pipe({
    name: 'siNo'
})
export class SiNoPipe implements PipeTransform {
    public transform(value: any, ...args: any[]): any {
        if (value !== null) {
            return value ? 'Sì' : 'No';
        }
        return null;
    }
}

@Pipe({
    name: 'Permission'
})
export class Permission implements PipeTransform {
    constructor(private auth: AppAuthGuard) {}
    public transform(value: any): any {
        if (environment.securityOn) {
            return this.auth.visibility!.indexOf(value) > -1;
        } else return true;
    }
}

// @Pipe({
//     name: 'tableInfo'
// })
// export class tableInfoPipe implements PipeTransform {
//     constructor(private translateService: VoilaTranslateService) {
//     }

//     public transform(value: any, totalElements: number, page: number, pageSize: number): any {
//         if (totalElements == 0) {
//             return '';
//         }
//         if (totalElements == 1) {
//             return this.translateService.instant('table.countSummary');
//         }
//         return this.translateService.instant('table.countSummaries', {
//             "totalElements": totalElements.toString(),
//             "start": (page * pageSize + 1).toString(),
//             "end": (Math.min((page + 1) * pageSize, totalElements)).toString()
//         });
//     }
// }

@Pipe({
    name: 'voilaTranslate'
})
export class VoilaTranslatePipe implements PipeTransform {
    constructor(private translateService: VoilaTranslateService) {}

    public transform(value: string, args?: { [key: string]: string }): any {
        return this.translateService.instant(value, args);
    }
}
