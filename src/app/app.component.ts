import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';
import {timer} from 'rxjs';
import {is_ios} from './common/tools/is_ios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public appShow = true;
  constructor(
    private router: Router,
    private globalSrv: GlobalService,
  ) {}
  ngOnInit(): void {
    console.log(environment.env);
    this.globalSrv.wxSessionSetObject('ios_url', window.location.href);
    // Judge screen
    if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90 || window.screen.orientation.angle === 270) {
      this.appShow = false;
    }
    // order status
    this.globalSrv.wxSessionSetObject('orderSelectStatus', 'all');
    // Judge
    if (window.navigator.userAgent.indexOf('MicroMessenger') === -1) {
      if (environment.production) {
        this.router.navigate(['/error']);
      }
    }
    window.addEventListener('orientationchange', () => {
      if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90 || window.screen.orientation.angle === 270) {
         this.appShow = false;
          return;
      }
      if (window.screen.orientation.angle === 0 || window.screen.orientation.angle === 180 || window.screen.orientation.angle === 360) {
        this.appShow = true;
        return;
      }
    });
    if (is_ios()) {
      document.addEventListener('focusin', () => {
        timer(80).subscribe(
          (val) => {
            window.scroll(0, 0);
          }
        );
      });
      document.addEventListener('focusout', () => {
        timer(80).subscribe(
          (val) => {
            window.scroll(0, 0);
          }
        );
      });
    }
  }
}

