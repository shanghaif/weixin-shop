import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorRemindComponent} from './error-remind/error-remind.component';
import {LoginGuard} from './common/guard/login.guard';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registered', canActivate: [LoginGuard], loadChildren: './registered/registered.module#RegisteredModule'},
  {path: 'tab', canActivate: [LoginGuard], loadChildren: './tab/tab.module#TabModule'},
  {path: 'product', canActivate: [LoginGuard], loadChildren: './product/product.module#ProductModule'},
  {path: 'order', canActivate: [LoginGuard], loadChildren: './order/order.module#OrderModule'},
  {path: 'pay', canActivate: [LoginGuard], loadChildren: './pay/pay.module#PayModule'},
  {path: 'mine', canActivate: [LoginGuard], loadChildren: './mine/mine.module#MineModule'},
  {path: 'address', canActivate: [LoginGuard], loadChildren: './address/address.module#AddressModule'},
  {path: 'error', component: ErrorRemindComponent},
  {path: '**', component: ErrorRemindComponent, data: {status: '404'}},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
