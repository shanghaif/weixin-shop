import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less']
})
export class TabComponent implements OnInit {
  public tabActive: string;
  constructor(
    private router: Router,
    private location: Location,
    private titleServices: Title
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.tabActive = this.location.path().split('/')[2];
      }
    });
  }

  ngOnInit() {
    this.titleServices.setTitle('首页');
  }
  public onSelect(name): void {
    this.router.navigate([`/tab/${name}`]);
    if (name === 'home') {
      this.titleServices.setTitle('首页');
      return;
    }
    if (name === 'client') {
      this.titleServices.setTitle('客户');
      return;
    }
    if (name === 'mine') {
      this.titleServices.setTitle('我的');
      return;
    }
  }


}
