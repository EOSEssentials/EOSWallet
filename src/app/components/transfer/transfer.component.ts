import {Component, OnInit} from '@angular/core';
import {ScatterService} from '../../services/scatter.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  to: string;
  amount: number;
  memo: string;

  constructor(private scatterService: ScatterService) {
  }

  ngOnInit() {
    let that = this;
    let options = {
      url: function(phrase) {
        return environment.apiUrl + '/accounts/name?name=' + phrase;
      },
      getValue: "name",
      list: {
        onSelectItemEvent: function() {
          that.to = $("#to").getSelectedItemData().name;
        }
      }
    };

    //$("#to").easyAutocomplete(options);
  }

  transfer(to: string, amount: number, memo: string) {
    this.scatterService.transfer(to, amount, memo,
      function (transaction) {
        console.log(transaction);
      }, function (error) {
        $("#errorTransfer").modal();
        console.log(error);
      }
    );
  }

}
