import {Component, OnInit, Renderer2} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';
import {Router} from '@angular/router';
import * as Eos from 'eosjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  @LocalStorage()
  identity: any;
  scatter: any = (<any>window).scatter; // TODO: move to a bigger scope as we will need it everywhere

  constructor(private router: Router, private renderer: Renderer2) {
    renderer.listen('document', 'scatterLoaded', () => {
        this.loadScatter();
      }
    );
  }

  ngOnInit() {
  }

  loadScatter() {
    this.scatter = (<any>window).scatter;
    const network = {host: "testnet1.eos.io", port: 80};
    const eosOptions = {};
    this.scatter.eos(Eos.Testnet, network, eosOptions);

  }

  transfer() {
    let that = this;
    // TODO: transfer
    return;
  }

}
