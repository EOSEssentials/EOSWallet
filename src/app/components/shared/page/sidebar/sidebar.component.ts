import {Component, OnInit} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @LocalStorage()
  isLogged: boolean;
  @LocalStorage()
  identity: any;
  @LocalStorage()
  eos: any;

  constructor() {
  }

  ngOnInit() {
  }

  logout() {
    this.isLogged = false;
    this.identity = null;
    this.eos = null;
  }
}
