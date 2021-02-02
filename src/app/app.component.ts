import { Component } from '@angular/core';
import { PizzasService } from './services/pizza.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'MammaMia';
  public currentYear: number = new Date().getFullYear();

  constructor(private pizzasService: PizzasService) {}

  public handleLoading(): boolean {
    return this.pizzasService.isLoadingGetter()
  }
}
