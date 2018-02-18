import {Injectable} from '@angular/core';
import * as Eos from 'eosjs';
import {LocalStorage} from 'ngx-webstorage';

@Injectable()
export class ScatterService {
  @LocalStorage()
  identity: any;
  eos: any;
  scatter: any;

  load() {
    console.log(this.identity);
    this.scatter = (<any>window).scatter;
    if (this.identity) {
      this.scatter.useIdentity(this.identity.hash);
    }
    const network = {host: "eosio.es", port: 1001}; // TODO: suggest networks
    this.eos = this.scatter.eos(Eos.Testnet, network);
  }

  login(successCallback, errorCallbak) {
    const requirements = ['account'];
    let that = this;
    this.scatter.getIdentity(requirements).then(
      function (identity) {
        if (!identity) {
          return errorCallbak(null);
        }
        that.identity = identity;
        that.scatter.useIdentity(identity.hash);
        successCallback();
      }
    ).catch(error => {
      errorCallbak(error);
    });
  }

  transfer(to: string, amount: number, memo: string = '', successCallback, errorCallback) {
    let that = this;
    this.login(function () {
        that.eos.transfer(that.identity.account.name, to, amount * 10000, memo, []).then(transaction => {
          successCallback(transaction);
        }).catch(error => {
          errorCallback(error);
        });
      }, function (error) {
        errorCallback(error);
      }
    );
  }
}
