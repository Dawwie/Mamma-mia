import { PizzasComponent } from './pizzas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PizzasComponent],
  imports: [
    CommonModule
  ],
  exports: [PizzasComponent]
})
export class PizzasModule { }
