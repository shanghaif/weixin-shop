import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayWayComponent } from './pay-way/pay-way.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import {PayRoutingModule} from './pay-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {DialogPayModule} from '../common/components/dialog-pay/dialog-pay.module';
import {WeUiModule} from 'ngx-weui';
import {LoadingModule} from '../common/components/loading/loading.module';

@NgModule({
  declarations: [
    PayWayComponent,
    PaySuccessComponent,
  ],
  imports: [
    CommonModule,
    PayRoutingModule,
    HeaderModule,
    LoadingModule,
    FormsModule,
    DialogPayModule,
    WeUiModule.forRoot(),
  ]
})
export class PayModule { }
