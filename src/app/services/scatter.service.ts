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
    console.log('loading', this.identity);

    this.scatter = (<any>window).scatter;
    (<any>window).scatter = null;

    this.bindIdentity(this.identity);

    const network = {host: "eosio.es", port: 1001}; // TODO: Suggest networks
    this.eos = this.scatter.eos(Eos.Testnet, network);

  }

  login(successCallback, errorCallback) {
    const requirements = ['account'];
    this.scatter.suggestNetwork().then(() => {
      this.scatter.getIdentity(requirements).then(identity => {
        if (!identity) return errorCallback(null);
        this.bindIdentity(identity);
        successCallback();
      })
      .catch(error => errorCallback(error));
    }).catch(error => errorCallback(error));
  }

  transfer(to: string, amount: number, memo: string = '', successCallback, errorCallback) {
    this.login(() => {
      this.eos.transfer(this.identity.account.name, to, amount * 10000, memo)
          .then(transaction => successCallback(transaction))
          .catch(error => errorCallback(error));
      }, (error) => errorCallback(error)
    );
  }

  private bindIdentity(identity){
    if(identity){
      this.identity = identity;
      this.scatter.useIdentity(identity);
    }
  }
}
