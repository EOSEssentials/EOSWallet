import {Component, OnInit} from '@angular/core';
import {ScatterService} from '../../services/scatter.service';

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
