import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {HttpClient} from '@angular/common/http';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import {environment} from '../../../environments/environment';
import {LocalStorage} from 'ngx-webstorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  messages = null;
  groups = null;
  @LocalStorage()
  identity: any;
  handler = 'eos';
  private alive: boolean;

  constructor(private dashboardService: DashboardService, private http: HttpClient) {
    this.alive = true;
    console.log(this.identity);
  }

  ngOnInit() {
    TimerObservable.create(0, 10000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.http.get(environment.apiUrl + '/wallet/messages?scope=' + this.identity.name + '&handler=' + this.handler + '&size=20').subscribe(data => {
          this.messages = [];
          for (let transaction of data[1]) {
            this.messages.push(transaction.message);
          }
          console.log(this.messages);
        });
      });

    this.http.get(environment.apiUrl + '/wallet/messages/groups?scope=' + this.identity.name).subscribe(data => {
      this.groups = [];
      for (let group of data[1]) {
        this.groups.push(group);
      }
      console.log(this.groups);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
