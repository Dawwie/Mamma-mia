import { Component, OnInit } from '@angular/core';
import { Pizza } from '../interfaces/pizza';
import { PizzasService } from '../services/pizza.service';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public selectedPizzas: Array<Pizza> = []
  constructor(private pizzasService: PizzasService,
              private toastrService: NbToastrService) { }

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

  total(): string {
    return this.selectedPizzas
      .reduce((sum, pizza) => sum += pizza.price ,0)
      .toLocaleString("pl", {style: "currency", currency: "PLN"})
  }

  orderPizza(): void{
    let orderDTO = {
      pizza: this.selectedPizzas,
      total: this.selectedPizzas.length
    }
    this.pizzasService
      .orderPizza(orderDTO)
      .subscribe(() => this.showToast(3000,"success"));
  }

  showToast(duration: number, status: NbComponentStatus): void {
    this.toastrService.show(
      'Przyblizony czas realizacji zamówienia to 1h 30min',
      'Zamówienie zostało złożone',
      {duration});
  }

}
