import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject} from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Pizza, Order } from '../interfaces/Pizza';

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  private static PIZZAS_URL: string = 'http://localhost:3333/api/pizza'; // URL to pizza
  private static ORDER_URL: string = 'http://localhost:3333/api/order'; // URL to order
  private selectedPizzas$: BehaviorSubject<Array<Pizza>> = new BehaviorSubject<
    Array<Pizza>
  >([]);
  private httpOptions: { [key: string]: any } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public isLoading = true;

  constructor(private http: HttpClient) {}

  public getSelectedPizzas(): Observable<Array<Pizza>> {
    return this.selectedPizzas$.asObservable();
  }

  public setSelectedPizzas(pizzas: Array<Pizza>) {
    this.selectedPizzas$.next(pizzas);
  }

  public getPizzas(): Observable<Array<Pizza>> {
    return this.http
      .get<Array<Pizza>>(PizzasService.PIZZAS_URL)
      .pipe(
        catchError(this.handleError<Array<Pizza>>('getPizzas', [])),
        finalize(() => {
          this.isLoading = false;
        })
      );
  }

  public orderPizza(order: Order): Observable<Order> {
    return this.http
      .post<Order>(PizzasService.ORDER_URL, order, this.httpOptions)
      .pipe(catchError(this.handleError<Order>('orderPizza', order)));
    }

  public isLoadingGetter(): boolean {
    return this.isLoading
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
