import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredReferrerComponent } from './registered-referrer/registered-referrer.component';
import {RegisteredRoutingModule} from './registered-routing.module';
import { RegisteredSubmitComponent } from './registered-submit/registered-submit.component';
import {WeUiModule} from 'ngx-weui';
import {HeaderModule} from '../common/components/header/header.module';
import { RegisteredCameraComponent } from './registered-camera/registered-camera.component';
import { RegisteredSuccessComponent } from './registered-success/registered-success.component';
import {FormsModule} from '@angular/forms';
import {DialogPayModule} from '../common/components/dialog-pay/dialog-pay.module';
import { RegisteredScanComponent } from './registered-scan/registered-scan.component';

@NgModule({
  declarations: [RegisteredReferrerComponent, RegisteredSubmitComponent, RegisteredCameraComponent, RegisteredSuccessComponent, RegisteredScanComponent],
  imports: [
    CommonModule,
    RegisteredRoutingModule,
    WeUiModule.forRoot(),
    HeaderModule,
    FormsModule,
    DialogPayModule
  ]
})
export class RegisteredModule { }
