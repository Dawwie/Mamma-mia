import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTooltipModule, NbButtonModule, NbIconModule, NbCardModule, NbToastrModule} from '@nebular/theme';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    NbTooltipModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbToastrModule.forRoot()
  ],
  exports: [CartComponent]
})
export class CartModule { }
