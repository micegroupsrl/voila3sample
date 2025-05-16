import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { LANGUAGE, LANGUAGE_START } from './header.constant';
import { VoilaTranslateService } from 'src/app/utilities/services/voila-translate.service';
import { environment } from 'src/environments/environment';
import { ProfileDialog } from '../profile/profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ChatComponent } from 'src/app/chat/chat.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
    @Output() snav: EventEmitter<void> = new EventEmitter<void>();
    public langaugeArray: any = LANGUAGE;
    public defaultLanguage: any = LANGUAGE_START;
    private first = true;
    protected username: string = 'Default';
    private agentProfile: any = {};
    protected cookie: boolean = false;
    chat = false;
    public disableMenuButton: boolean = false;
    private subscriptions = new Subscription();

    constructor(
        private translateService: VoilaTranslateService,
        private cookieService: CookieService,
        protected router: Router,
        private matDialog: MatDialog
    ) {}

    ngOnInit() {
        if (environment.securityOn) {
            this.cookie = this.cookieService.check('voila3sampleCookie');

            if (!this.cookieService.check('voila3sampleCookie')) {
                this.disableMenuButton = true;
            }
        }
    }

    public snavClick() {
        this.snav.emit();
    }
    
    public changeLanguage(langauge: any): void {
        if (langauge.isUserInput || this.first) {
            this.translateService.setDefaultLang(langauge.source.value);
            this.first = false;
        }
    }

    OpenModal() {
        this.matDialog.open(ProfileDialog, {
            data: this.agentProfile,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            hasBackdrop: true
        });
    }

    openNewChat() {
        const dialogRef = this.matDialog.open(ChatComponent, {
            backdropClass: 'cdk-overlay-transparent-backdrop',
            hasBackdrop: false,
            disableClose: true,
            height: 'auto',
            width: 'auto'
        });
        
        this.subscriptions.add(
            dialogRef.afterClosed().subscribe(() => {
                this.chat = false;
            })
        );
        
        this.chat = true;
    }

    goHome() {
        if (this.cookieService.check('voila3sampleCookie') && environment.securityOn) {
            this.router.navigate(['/home']);
        }
    }
    
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this.subscriptions.unsubscribe();
    }
}
