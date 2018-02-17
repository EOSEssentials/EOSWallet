import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageComponent} from './components/shared/page/page.component';
import {NavbarComponent} from './components/shared/page/navbar/navbar.component';
import {SidebarComponent} from './components/shared/page/sidebar/sidebar.component';
import {DashboardService} from './services/dashboard.service';
import {FormsModule} from '@angular/forms';
import {LoadingComponent} from './components/shared/page/loading/loading.component';
import {HttpClientModule} from '@angular/common/http';
import {PrettyJsonModule, SafeJsonPipe} from 'angular2-prettyjson';
import {JsonPipe} from '@angular/common';
import {Ng2Webstorage} from 'ngx-webstorage';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import { TransferComponent } from './components/transfer/transfer.component';
import { ActionsComponent } from './components/actions/actions.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { SettingsComponent } from './components/settings/settings.component';
import {ScatterService} from './services/scatter.service';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'transfer', component: TransferComponent, canActivate: [AuthGuard]},
  {path: 'actions', component: ActionsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'currencies', component: CurrenciesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    LoadingComponent,
    LoginComponent,
    TransferComponent,
    ActionsComponent,
    CurrenciesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PrettyJsonModule,
    Ng2Webstorage,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DashboardService,
    ScatterService,
    AuthGuard,
    {provide: JsonPipe, useClass: SafeJsonPipe}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
