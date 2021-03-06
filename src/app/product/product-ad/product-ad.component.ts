import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../common/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-ad',
  templateUrl: './product-ad.component.html',
  styleUrls: ['./product-ad.component.less']
})
export class ProductAdComponent implements OnInit {
  public prodAdInfo: any = null;
  public prodAdInfoHtml: any = null;
  constructor(
    private productSrv: ProductService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.productInit();
  }
  public productInit(): void {
    this.routerInfo.queryParams.subscribe(
      (prop) => {
        this.productSrv.prodGetBanner().subscribe(
          (val) => {
            if (val.status === 200) {
              val.datas.map((param) => {
                if (param.id == prop.id) {
                  this.prodAdInfo = param;
                  this.prodAdInfoHtml = this.sanitizer.bypassSecurityTrustHtml(param.content);
                }
              });
              return;
            }
             this.router.navigate(['/error'], {
               queryParams: {
                 msg: `获取信息失败，错误码${val.status}`,
                 url: null,
                 btn: '请重试',
               }
             });
          }
        );
      }
    );
  }
}
