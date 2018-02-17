import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import {environment} from '../../../environments/environment';
import {ScatterService} from '../../services/scatter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  messages = null;
  groups = null;
  handler = 'eos';
  private alive: boolean;
  username: string;

  constructor(private http: HttpClient, private scatterService: ScatterService) {
    this.alive = true;
    this.username = this.scatterService.identity.name;
  }

  ngOnInit() {
    TimerObservable.create(0, 10000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.http.get(environment.apiUrl + '/wallet/messages?scope=' + this.username + '&handler=' + this.handler + '&size=20').subscribe(data => {
          this.messages = [];
          this.plot();
          for (let transaction of data[1]) {
            this.messages.push(transaction.message);
          }
          console.log(this.messages);
        });
      });

    this.http.get(environment.apiUrl + '/wallet/messages/groups?scope=' + this.username).subscribe(data => {
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

  plot() {
    let d = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 77], [1196809200000, 3636], [1196895600000, 3575], [1196982000000, 2736], [1197068400000, 1086], [1197154800000, 676], [1197241200000, 1205], [1197327600000, 906], [1197414000000, 710], [1197500400000, 639], [1197586800000, 540], [1197673200000, 435], [1197759600000, 301], [1197846000000, 575], [1197932400000, 481], [1198018800000, 591], [1198105200000, 608], [1198191600000, 459], [1198278000000, 234], [1198364400000, 1352], [1198450800000, 686], [1198537200000, 279], [1198623600000, 449], [1198710000000, 468], [1198796400000, 392], [1198882800000, 282], [1198969200000, 208], [1199055600000, 229], [1199142000000, 177], [1199228400000, 374], [1199314800000, 436], [1199401200000, 404], [1199487600000, 253], [1199574000000, 218], [1199660400000, 476], [1199746800000, 462], [1199833200000, 448], [1199919600000, 442], [1200006000000, 403], [1200092400000, 204], [1200178800000, 194], [1200265200000, 327], [1200351600000, 374], [1200438000000, 507], [1200524400000, 546], [1200610800000, 482], [1200697200000, 283], [1200783600000, 221], [1200870000000, 483], [1200956400000, 523], [1201042800000, 528], [1201129200000, 483], [1201215600000, 452], [1201302000000, 270], [1201388400000, 222], [1201474800000, 439], [1201561200000, 559], [1201647600000, 521], [1201734000000, 477], [1201820400000, 442], [1201906800000, 252], [1201993200000, 236], [1202079600000, 525], [1202166000000, 477], [1202252400000, 386], [1202338800000, 409], [1202425200000, 408], [1202511600000, 237], [1202598000000, 193], [1202684400000, 357], [1202770800000, 414], [1202857200000, 393], [1202943600000, 353], [1203030000000, 364], [1203116400000, 215], [1203202800000, 214], [1203289200000, 356], [1203375600000, 399], [1203462000000, 334], [1203548400000, 348], [1203634800000, 243], [1203721200000, 126], [1203807600000, 157], [1203894000000, 288]];

    // first correct the timestamps - they are recorded as the daily
    // midnights in UTC+0100, but Flot always displays dates in UTC
    // so we have to add one hour to hit the midnights in the plot

    for (let i = 0; i < d.length; ++i) {
      d[i][0] += 60 * 60 * 1000;
    }

    // helper for returning the weekends in a period

    function weekendAreas(axes) {

      let markings = [], d = new Date(axes.xaxis.min);

      d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
      d.setUTCSeconds(0);
      d.setUTCMinutes(0);
      d.setUTCHours(0);

      let i = d.getTime();

      do {
        markings.push({xaxis: {from: i, to: i + 2 * 24 * 60 * 60 * 1000}});
        i += 7 * 24 * 60 * 60 * 1000;
      } while (i < axes.xaxis.max);

      return markings;
    }

    let options = {
      xaxis: {
        mode: "time",
        tickLength: 5
      },
      selection: {
        mode: "x"
      },
      grid: {
        markings: weekendAreas
      }
    };

    let plot = $.plot("#placeholder", [d], options);
  }
}
