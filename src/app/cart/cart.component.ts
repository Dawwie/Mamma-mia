import { Component, OnInit } from '@angular/core';
import { Pizza } from '../interfaces/pizza';
import { PizzasService } from '../services/pizza.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  selectedPizzas: Array<Pizza> = []
  constructor(private pizzasService: PizzasService) { }

  ngOnInit(): void {
    this.pizzasService.getSelectedPizzas().subscribe(pizzas => this.selectedPizzas = pizzas);
  }

  removeFromCart(pizzaId: string): void {
    let pizzaToRemoveIndex = this.selectedPizzas.findIndex(el => el.id === pizzaId)
    this.selectedPizzas.splice(pizzaToRemoveIndex, 1)
    this.pizzasService.setSelectedPizzas(this.selectedPizzas)
  }

  identify(index: number, pizza: Pizza): string {
    return pizza?.id ?? index.toString()
  }

}
