import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(
    public http: HttpClient
  ) { }
  // mine order detail
  public payOrdGetDetail(params): Observable<any> {
    return this.http.post(`/moayoOrder/orderItem`, params);
  }
  // verify password
  public payPwdVerify(params): Observable<any> {
    return this.http.post(`/orderPay/payPwd`, params);
  }
  // wallet pay
  public payWalletVerify(params): Observable<any> {
    return this.http.post(`/orderPay/orderWalletPay`, params);
  }
  // weixin pay
  public payWeixinVerify(params): Observable<any> {
    console.log(params);
    return this.http.post(`/orderPay/orderWxPay`, params);
  }
  // Confirm payment status
  public payWeixinConfirm(params): Observable<any> {
    console.log(params);
    return this.http.post(`/orderPay/confirmWxPay`, params);
  }
}
