import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"",component:AllProductsComponent},

  {path:"view/:id",component:ViewProductsComponent},

  {path:"login",component:LoginComponent},

  {path:"register",component:RegisterComponent},

  {path:"wishlist",component:WishlistComponent},

  {path:"cart",component:CartComponent},

  {path:"**",redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
