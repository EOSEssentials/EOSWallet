import {Component, OnInit} from '@angular/core';
import {ScatterService} from '../../services/scatter.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private scatterService: ScatterService) {
  }

  ngOnInit() {
  }

  transfer() {
    this.scatterService.transfer('kesarito2', 10, '',
      function (transaction) {
        console.log(transaction);
      }, function (error) {
        $("#errorTransfer").modal();
        console.log(error);
      }
    );
  }

}
