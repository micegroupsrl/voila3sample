import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'src/app/utilities/services/toastr.service';
import { SecurityService } from '@micegroup/voila2-runtime-ng';
import { VoilaTranslateService } from 'src/app/utilities/services/voila-translate.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { Router } from '@angular/router';

@Injectable()
export class WebInterceptor implements HttpInterceptor {
    constructor(
        private toasterService: ToastrService,
        private securityService: SecurityService,
        private translateService: VoilaTranslateService,
        private overlaysService: OverlaysService,
        protected router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'POST' || req.method === 'PUT') {
            this.shiftDates(req.body);
        }

        return next.handle(req).pipe(catchError(error => this.handleErrorResponse(req, error)));
    }

    private handleErrorResponse(authReq: HttpRequest<any>, error: HttpErrorResponse): Observable<never> {
        const e: any = error.error;
        const urlSegments = authReq.url.split('/');

        switch (error.status) {
            case 401:
                this.securityService.logOut();
                break;
            case 400:
                this.handleBadRequestError(e, urlSegments);
                break;
            case 404:
                this.handleNotFoundError(e, urlSegments);
                break;
            case 409:
                this.handleConflictError(e);
                break;
            default:
                this.toasterService.showDanger(error.message);
        }

        return throwError(error);
    }

    private handleBadRequestError(error: any, urlSegments: string[]): void {
        switch (error.reasonPhrase) {
            case 'AlreadyFoundException':
                this.toasterService.showDanger(
                    this.translateService.instant('errors.AlreadyFoundException', {
                        resource: this.translateService.resolveEntity(error.message.resource, urlSegments[3]),
                        id: error.message.id
                    })
                );
                this.overlaysService.loadingOff();
                break;
            case 'MethodArgumentValidationFailed':
                error.message.forEach((m: any) => {
                    const msg: string = this.translateService.resolveMessage(m, urlSegments[3]);
                    this.toasterService.showDanger(msg);
                });
                break;
            default:
                this.toasterService.showDanger(error.message);
        }
    }

    private handleNotFoundError(error: any, urlSegments: string[]): void {
        if (error.reasonPhrase === 'NotFoundException') {
            this.toasterService.showDanger(
                this.translateService.instant('errors.NotFoundException', {
                    resource: this.translateService.resolveEntity(error.message.resource, urlSegments[3]),
                    id: error.message.id
                })
            );
        }
    }

    private handleConflictError(error: any): void {
        if (error.reasonPhrase === 'BusinessException') {
            error.message.forEach((m: any) => {
                let msg: string = m.messageDescription;
                if (m.messageKey != null) {
                    msg = this.translateService.instant(m.messageKey, m.args);
                }
                if (m.severity === 'INFO') {
                    this.toasterService.showMessage(msg);
                } else if (m.severity === 'WARNING') {
                    this.toasterService.showMessage(msg);
                } else {
                    this.toasterService.showDanger(msg);
                }
            });
        }
    }

    shiftDates(body: any) {
        if (body === null || body === undefined) {
            return body;
        }

        if (typeof body !== 'object') {
            return body;
        }

        for (const key of Object.keys(body)) {
            const value = body[key];
            if (value instanceof Date) {
                body[key] = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds()))
                    .toISOString()
                    .slice(0, -1);
            } else if (typeof value === 'object') {
                this.shiftDates(value);
            }
        }
    }
}
