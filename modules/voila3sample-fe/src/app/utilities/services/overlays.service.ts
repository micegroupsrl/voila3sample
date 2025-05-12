import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ToastrService } from './toastr.service';

@Injectable({
    providedIn: 'root'
})
export class OverlaysService {
    private toastService!: ToastrService;
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();
    private asyncLoadCount: number = 0;

    constructor(
        private injector: Injector,
        router: Router
    ) {
        // The Router emits special events for "loadChildren" configuration loading. We
        // just need to listen for the Start and End events in order to determine if we
        // have any pending configuration requests.
        router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart) {
                this.asyncLoadCount++;
            } else if (event instanceof RouteConfigLoadEnd) {
                this.asyncLoadCount--;
            }
            if (this.asyncLoadCount > 0) {
                this.loadingOn();
            } else {
                this.loadingOff();
            }
        });
    }

    loadingOn() {
        this.loadingSubject.next(true);
    }

    loadingOff() {
        this.loadingSubject.next(false);
    }

    get toast(): ToastrService {
        if (!this.toastService) this.toastService = this.injector.get(ToastrService);
        return this.toastService;
    }
}
