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

  constructor() {
  }

  ngOnInit() {
  }

  logout() {
    this.isLogged = false;
  }
}
