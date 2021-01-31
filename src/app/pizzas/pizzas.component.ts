import { Component, OnInit } from '@angular/core';

import { Pizza } from '../interfaces/pizza';
import { PizzasService } from '../services/pizza.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  pizzas: Pizza[];
  private selectedPizzas: Array<Pizza> = []

  constructor(private pizzaService: PizzasService) { }

  ngOnInit(): void {
    this.getPizzas();
  }

  getPizzas(): void {
    this.pizzaService.getPizzas()
    .subscribe(pizzas => this.pizzas = pizzas)
  }

  addProductToCart(pizza: Pizza): void {
    this.selectedPizzas.push(pizza)
    this.pizzaService.setSelectedPizzas(this.selectedPizzas)
  }

  identify(index: number, pizza: Pizza): string {
    return pizza?.id ?? index.toString()
  }
}
