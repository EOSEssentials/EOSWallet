import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageComponent} from './components/shared/page/page.component';
import {NavbarComponent} from './components/shared/page/navbar/navbar.component';
import {SidebarComponent} from './components/shared/page/sidebar/sidebar.component';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {TransactionComponent} from './components/transaction/transaction.component';
import {TransactionService} from './services/transaction.service';
import {DashboardService} from './services/dashboard.service';
import {FormsModule} from '@angular/forms';
import { LoadingComponent } from './components/shared/page/loading/loading.component';
import {HttpClientModule} from '@angular/common/http';
import {PrettyJsonModule, SafeJsonPipe} from 'angular2-prettyjson';
import {JsonPipe} from '@angular/common';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'transactions/:id', component: TransactionComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageComponent,
    NavbarComponent,
    SidebarComponent,
    TransactionsComponent,
    TransactionComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PrettyJsonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TransactionService,
    DashboardService,
    { provide: JsonPipe, useClass: SafeJsonPipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
