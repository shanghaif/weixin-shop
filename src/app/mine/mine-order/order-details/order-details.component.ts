import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {EMPTY, Observable, timer} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastComponent, ToastService} from 'ngx-weui';
import {GlobalService} from '../../../common/services/global.service';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '订单详情',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // toast
  @ViewChild('mineOrderToast') mineOrderToast: ToastComponent;
  public mineOrderMsg: string;
  // details list
  public detailsData: any = null;
  public detailsPrice: any = null;
  // order status
  public orderDetailStates: any = {
    pendingPayment: {name: '待付款', bgColor: ['#7CC2FC', '#BEA9FA'], services: '',
      operating: [{title: '取消订单', routes: ''}, {title: '去付款', routes: '/pay/sure'}]},
    pendingShipment: {name: '待发货', bgColor: ['#7C9CFC', '#ACDAF9'], services: '退款/售后', operating: []},
    shipped: {name: '待收货', bgColor: ['#F19270', '#F478A0'], services: '退款/售后',
      operating: [{title: '查看物流', routes: '/mine/order/logistics'}, {title: '确认收货', routes: ''}]},
    received: {name: '已收货', bgColor: [], operating: ['#80B66F', '#B0F49A']},
    completed: {name: '已完成', bgColor: ['#F1926F', '#F477A1'], services: '退款/售后',
      operating: [{title: '再下一单', routes: '/order'}]},
    canceled: {name: '已取消', bgColor: ['#8E8E8E', '#C2C2C2'], services: '',
      operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: ''}]},
    failed: {name: '已取消', bgColor: ['#9E9E9E', '#DFDFDF'], services: '',
      operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: ''}]},

    goodsReturnReview: {name: '退货退款审核中...', bgColor: ['#FF7070', '#FB9B9B'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    goodsReturning: {name: '退货中', bgColor: ['#FF7070', '#FB9B9B'], services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    goodsReturned: {name: '已退货', bgColor: ['#FF7070', '#FB9B9B'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},

    refundReview: {name: '退款审核中', bgColor: ['#FF7070', '#FB9B9B'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},
    refundding: {name: '退款中', bgColor: ['#FF7070', '#FB9B9B'], services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},
    refundded: {name: '已退款', bgColor: ['#FF7070', '#FB9B9B'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},

    pendingReview: {name: '待审核', bgColor: ['#FF7070', '#FB9B9B'], operating: []}};
  constructor(
    private mOrderSrv: MineOrderService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private srv: ToastService,
    private globalSrv: GlobalService,
  ) {}

  ngOnInit() {
    this.routerInfo.params.subscribe(params => this.mineOrdDetailInit(params.id));
  }
  public mineOrdDetailInit (id): void {
    this.mOrderSrv.mineOrdGetDetail({orderId: id}).subscribe(
        (val) => {
          if (val.status === 200) {
            this.detailsData = val.data;
            val.data.moyaoOrderItemModels.map((item) => {
              this.detailsPrice += item.goods.discountPrice * item.quantity;
            });
            return;
          }
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `获取订单详情失败，错误码${val.status}`,
              url: null,
              btn: '请重试'
            }
          });
        }
      );
  }
  // order operate
  public orderDetailOpeClick(param, childItem, status): void {
    if (param.title === '退货进度') {
      if (status === 'refundReview' || status === 'refundding' || status === 'refundded') {
        this.router.navigate([param.routes, childItem.id, 0, status]);
        return;
      }
      this.router.navigate([param.routes, childItem.id, 1, status]);
      return;
    }
    if (param.title === '退款进度') {
      if (status === 'refundReview' || status === 'refundding' || status === 'refundded') {
        this.router.navigate([param.routes, childItem.id, 0, status]);
        return;
      }
      this.router.navigate([param.routes, childItem.id, 1, status]);
      return;
    }
    if (param.title === '去付款') {
      this.router.navigate([param.routes], {queryParams: {orderId: childItem.id}});
      return;
    }
    if (param.title === '查看物流') {
      this.router.navigate([param.routes], {queryParams: {orderId: childItem.id}});
      return;
    }
    if (param.title === '确认收货') {
      this.mOrderSrv.mineOrdFinish({orderId: childItem.id}).subscribe(
        (val) => {
          if (val.status === 200) {
          }
        }
      );
      return;
    }
    if (param.title === '再下一单') {
      childItem.moyaoOrderItemModels.map((prop, index) => {
        this.globalSrv.wxSessionSetObject(`goods${index}`, prop.quantity);
      });
      this.router.navigate([param.routes]);
      return;
    }
    if (param.title === '重新购买') {
      childItem.moyaoOrderItemModels.map((prop, index) => {
        this.globalSrv.wxSessionSetObject(`goods${index}`, prop.quantity);
      });
      this.router.navigate([param.routes]);
      return;
    }
    if (param.title === '再次购买') {
      childItem.moyaoOrderItemModels.map((prop, index) => {
        this.globalSrv.wxSessionSetObject(`goods${index}`, prop.quantity);
      });
      this.router.navigate([param.routes]);
      return;
    }
    if (param.title === '取消订单') {
      this.srv.loading();
      this.mOrderSrv.mineOrdCancel({orderId: childItem.id}).subscribe(
        (val) => {
          this.srv.hide();
          if (val.status === 200) {
            this.mineOrderMsg = val.message;
            this.onShow('mineOrder');
            timer(2000).subscribe(() => window.history.back());
            return;
          }
          this.mineOrderMsg = `${val.message},错误码：${val.status}`;
          this.onShow('mineOrder');
        }
      );
      return;
    }
    if (param.title === '删除订单') {
      this.srv.loading();
      this.mOrderSrv.mineOrdDelete({orderId: childItem.id}).subscribe(
        (val) => {
          this.srv.hide();
          if (val.status === 200) {
            this.mineOrderMsg = val.message;
            this.onShow('mineOrder');
            timer(2000).subscribe(() => window.history.back());
            return;
          }
          this.mineOrderMsg = `${val.message},错误码：${val.status}`;
          this.onShow('mineOrder');
        }
      );
      return;
    }
  }
  // toast
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  // details Ems Click
  public detailsEmsClick(): void {
    if (this.detailsData.status === 'shipped') {
      this.router.navigate(['/mine/order/logistics'], {queryParams: {orderId: this.detailsData.id}});
    }
  }
}
