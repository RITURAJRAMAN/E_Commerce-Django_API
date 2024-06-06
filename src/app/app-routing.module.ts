import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './myComponents/home/home.component';
import { CartsComponent } from './myComponents/carts/carts.component';
import { ProfileComponent } from './myComponents/profile/profile.component';
import { OrdersComponent } from './myComponents/orders/orders.component';
import { LoginComponent } from './myComponents/login/login.component';
import { SignupComponent } from './myComponents/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './myComponents/product/product.component';
import { AllordersComponent } from './myComponents/allorders/allorders.component';
import { RoleguardGuard } from './guards/roleguard.guard';
import { CategoriesComponent } from './myComponents/categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'category/:cname', component: CategoriesComponent },
  {
    path: 'addproduct',
    component: ProductComponent,
    canActivate: [AuthGuard, RoleguardGuard],
  },
  {
    path: 'allorders',
    component: AllordersComponent,
    canActivate: [AuthGuard, RoleguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
