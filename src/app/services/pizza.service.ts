import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pizza } from '../interfaces/Pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {
  private pizzasUrl: string = 'http://localhost:3333/api/pizza';  // URL to web api
  private selectedPizzas$: BehaviorSubject<Array<Pizza>> = new BehaviorSubject(null);
  // private httpOptions: {[key: string]: any} = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
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

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.pizzasUrl)
      .pipe(
        catchError(this.handleError<Pizza[]>('getPizzas', []))
      );
  }



}
