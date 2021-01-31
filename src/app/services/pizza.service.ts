import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Pizza, Order } from '../interfaces/Pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {
  private pizzasUrl: string = 'http://localhost:3333/api/pizza';  // URL to pizza
  private orderUrl: string = 'http://localhost:3333/api/order';  // URL to order
  private selectedPizzas$: BehaviorSubject<Array<Pizza>> = new BehaviorSubject(null);
  private httpOptions: {[key: string]: any} = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  public getSelectedPizzas(): Observable<Array<Pizza>> {
      return this.selectedPizzas$.asObservable();
  }

  public setSelectedPizzas(pizzas: Array<Pizza>) {
      this.selectedPizzas$.next(pizzas);
  }

  constructor(private http: HttpClient) { }

  getPizzas(): Observable<Array<Pizza>> {
    return this.http.get<Array<Pizza>>(this.pizzasUrl)
      .pipe(
        catchError(this.handleError<Array<Pizza>>('getPizzas', []))
      );
  }

  orderPizza(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order, this.httpOptions)
    .pipe(
      catchError(this.handleError('addHero', order))
    );
  }



}
