import {Component, OnInit, Renderer2} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {ScatterService} from '../../services/scatter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @LocalStorage()
  isLogged: boolean;

  constructor(private router: Router, private renderer: Renderer2, private scatterService: ScatterService) {
    renderer.listen('document', 'scatterLoaded', () => {
        this.scatterService.load();
      }
    );
  }

  ngOnInit() {
    if (this.isLogged) {
      this.router.navigate(['/']);
    }
  }

  login() {
    let that = this;
    this.scatterService.login(
      function () {
        that.isLogged = true;
        that.router.navigate(['/']);
      }, function (error) {
        $("#unlockScatter").modal();
        console.log(error);
      }
    );
  }
}
