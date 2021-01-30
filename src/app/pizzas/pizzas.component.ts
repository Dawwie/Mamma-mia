import { Component, OnInit } from '@angular/core';

import { Pizza } from '../interfaces/pizza';
import { PizzasService } from '../pizza.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  pizzas: Pizza[];

  constructor(private pizzaService: PizzasService) { }

  ngOnInit() {
    this.getPizzas();
  }

  getPizzas(): void {
    this.pizzaService.getPizzas()
    .subscribe(pizzas => this.pizzas = pizzas)
  }
}
