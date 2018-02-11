import {Component, OnInit} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @LocalStorage()
  isLogged: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.isLogged) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.isLogged = true;
    this.router.navigate(['/']);
  }
}
