import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { OrderChartComponent } from './homepage/order-chart/order-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { ListLastSalesComponent } from './homepage/list-last-sales/list-last-sales.component';
import { SalesOverviewComponent } from './homepage/sales-overview/sales-overview.component';
import { ClientAgeComponent } from './homepage/client-gender/client-age.component';
import { HomepageComponent } from 'src/app/pages/homepage/homepage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const COMPONENT = [
    PagesComponent,
    HomepageComponent,
    OrderChartComponent,
    SalesOverviewComponent,
    ListLastSalesComponent,
    ClientAgeComponent,
    LoginComponent,
    RegistrationComponent
];

@NgModule({
    declarations: [...COMPONENT],
    imports: [
        SharedModule,
        CommonModule,
        PagesRoutingModule,
        NgxEchartsModule.forRoot({
            echarts
        })
    ]
})
export class PagesModule {}
