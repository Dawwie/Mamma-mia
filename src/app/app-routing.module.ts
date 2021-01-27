import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzasComponent } from './pizzas/pizzas.component';

const routes: Routes = [
  { path: '', component: PizzasComponent },
  { path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  { path: '**', component: PizzasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
