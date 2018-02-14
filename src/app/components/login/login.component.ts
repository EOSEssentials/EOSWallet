import {Component, OnInit, Renderer2} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';
import {Router} from '@angular/router';
import * as Eos from 'eosjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @LocalStorage()
  isLogged: boolean;
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
    if (this.isLogged) {
      this.router.navigate(['/']);
    }
  }

  loadScatter() {
    this.scatter = (<any>window).scatter;
    const network = {host: "testnet1.eos.io", port: 80};
    const eosOptions = {};
    this.scatter.eos(Eos.Testnet, network, eosOptions);

  }

  login() {
    const requirements = ['account'];
    let that = this;
    this.scatter.getIdentity(requirements).then(
      function (identity) {
        console.log(identity);
        that.identity = identity;
        that.scatter.useIdentity(identity.hash);
        that.isLogged = true;
        that.router.navigate(['/']);
      }
    ).catch(e => {
      console.log(e)
    });
  }
}
