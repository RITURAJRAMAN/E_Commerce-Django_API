import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './myComponents/nav/nav.component';
import { HomeComponent } from './myComponents/home/home.component';
import { ProfileComponent } from './myComponents/profile/profile.component';
import { CartsComponent } from './myComponents/carts/carts.component';
import { OrdersComponent } from './myComponents/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './myComponents/login/login.component';
import { SignupComponent } from './myComponents/signup/signup.component';
import { ProductComponent } from './myComponents/product/product.component';
import { AllordersComponent } from './myComponents/allorders/allorders.component';
import { CategoriesComponent } from './myComponents/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    CartsComponent,
    OrdersComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    AllordersComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
