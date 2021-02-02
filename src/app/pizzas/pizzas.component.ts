import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Pizza } from '../interfaces/pizza';
import { PizzasService } from '../services/pizza.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzasComponent implements OnInit {
  public pizzas: Pizza[];
  private selectedPizzas: Array<Pizza> = [];

  constructor(private pizzaService: PizzasService) {}

  public ngOnInit(): void {
    this.getPizzas();
  }

  private getPizzas(): void {
    this.pizzaService
      .getPizzas()
      .pipe(take(1))
      .subscribe((pizzas) => (this.pizzas = pizzas));

    this.pizzaService
      .getSelectedPizzas()
      .pipe(take(1))
      .subscribe((selectedPizzsInCart: Array<Pizza>) => {
        this.selectedPizzas = selectedPizzsInCart;
      });
  }

  public addProductToCart(pizza: Pizza): void {
    this.selectedPizzas?.push(pizza);
    this.pizzaService.setSelectedPizzas(this.selectedPizzas);
  }

  public identify(index: number, pizza: Pizza): string {
    return !pizza ? null : index.toString() || pizza.id;
  }
}
