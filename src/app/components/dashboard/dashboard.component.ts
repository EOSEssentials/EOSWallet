import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {HttpClient} from '@angular/common/http';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  transactions = null; // Transaction[]

  private alive: boolean; // used to unsubscribe from the TimerObservable

  constructor(private dashboardService: DashboardService, private http: HttpClient) {
    this.alive = true;
  }

  ngOnInit() {
    TimerObservable.create(0, 6000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.http.get(environment.apiUrl + '/transactions?size=20').subscribe(data => {
          this.transactions = data;
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
