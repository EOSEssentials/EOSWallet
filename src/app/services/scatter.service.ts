import {Injectable} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';
import * as Eos from 'eosjs';

@Injectable()
export class ScatterService {
  @LocalStorage()
  identity: any;
  eos: any;
  scatter: any;

  load() {
    this.scatter = (<any>window).scatter;
    if (this.identity) {
      this.scatter.useIdentity(this.identity.hash);
    }
    const network = {host: "eosio.es", port: 1001};
    this.eos = this.scatter.eos(Eos.Testnet, network);
  }

  login(success, error) {
    const requirements = ['account'];
    let that = this;
    this.scatter.getIdentity(requirements).then(
      function (identity) {
        console.log(identity);
        if (!identity) {
          return error(null);
        }
        that.identity = identity;
        that.scatter.useIdentity(identity.hash);
        success();
      }
    ).catch(error => {
      error(error);
    });
  }

  transfer(to: string, amount: number, memo: string = '', successCallback, errorCallback) {
    this.eos.transfer(this.identity.account.name, to, amount, memo, []).then(transaction => {
      successCallback(transaction);
    }).catch(error => {
      errorCallback(error);
    });
  }
}
