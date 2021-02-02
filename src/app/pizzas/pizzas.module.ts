import { PizzasComponent } from './pizzas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbTooltipModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';

@NgModule({
  declarations: [PizzasComponent],
  imports: [
    CommonModule,
    NbTooltipModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
  ],
  exports: [PizzasComponent],
})
export class PizzasModule {}
