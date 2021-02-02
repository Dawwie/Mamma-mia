import { Component, OnInit } from '@angular/core';
import { Pizza } from '../interfaces/pizza';
import { PizzasService } from '../services/pizza.service';
import { NbToastrService } from '@nebular/theme';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public selectedPizzas: Array<Pizza> = [];

  constructor(
    private pizzasService: PizzasService,
    private toastrService: NbToastrService
  ) {}

  public ngOnInit(): void {
    this.pizzasService
      .getSelectedPizzas()
      .pipe(take(1))
      .subscribe((pizzas: Array<Pizza>) => (this.selectedPizzas = pizzas));
  }

  public removeFromCart(pizzaId: string): void {
    let pizzaToRemoveIndex = this.selectedPizzas.findIndex(
      (el) => el.id === pizzaId
    );
    this.selectedPizzas.splice(pizzaToRemoveIndex, 1);
    this.pizzasService.setSelectedPizzas(this.selectedPizzas);
  }

  public identify(index: number, pizza: Pizza): string {
    return !pizza ? null : index.toString() || pizza.id;
  }

  public total(): string {
    return this.selectedPizzas
      .reduce((sum, pizza) => (sum += pizza.price), 0)
      .toLocaleString('pl', { style: 'currency', currency: 'PLN' });
  }

  public orderPizza(): void {
    let orderDTO: { pizza: Array<Pizza>; total: number } = {
      pizza: this.selectedPizzas,
      total: this.selectedPizzas.length,
    };

    this.pizzasService
      .orderPizza(orderDTO)
      .pipe(take(1))
      .subscribe(() => this.showToast(3000));
  }

  private showToast(duration: number): void {
    this.toastrService.show(
      'Przyblizony czas realizacji zamówienia to 1h 30min',
      'Zamówienie zostało złożone',
      { duration }
    );
  }
}
