import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ResidSharedModule } from 'src/@shared';
import { ResidFormModule } from './common/form/form.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { SidenavComponent } from 'src/app/layout/sidenav/sidenav.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { BaseComponent } from './shared/base/base.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WebInterceptor } from './shared/interceptor/error.interceptor';
import { VoilaTranslateService } from './utilities/services/voila-translate.service';

import { TranslateLoader, TranslateModule } from '@micegroup/voila2-translate-ng';
import { LazyTranslateLoader } from './translate.config';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppAuthGuard } from './app.authguard';
import { ProfileDialog } from './layout/profile/profile-dialog.component';
import { ChatBotModule } from './chat/chat-bot.module';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        HeaderComponent,
        //HomepageComponent,
        BaseComponent,
        ProfileDialog
    ],
    imports: [
        ChatBotModule,
        NgxEchartsModule,
        SharedModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ResidFormModule,
        ResidSharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: LazyTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: WebInterceptor, multi: true }, AppAuthGuard, VoilaTranslateService],
    entryComponents: [AppComponent]
})
export class AppModule {
    ngDoBootstrap(app: { bootstrap: (arg0: typeof AppComponent) => void }) {
        app.bootstrap(AppComponent);
    }
}
