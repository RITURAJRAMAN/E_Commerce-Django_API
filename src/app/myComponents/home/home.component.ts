import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { CartstateService } from 'src/app/myServices/state/cartstate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ProductArray: any = [];
  ifresult: boolean = true;
  token: any;
  user_id: any;
  searchTerm: any;
  mensArray: any[] = [];
  womensArray: any[] = [];
  kidsArray: any[] = [];
  showsearch: boolean = false;
  filteredArray: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartState: CartstateService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token !== null) {
      let decoded: any = jwtDecode<JwtPayload>(this.token);
      this.user_id = decoded.user_id;
    }
    this.getProductsWithCart();
    // this.getproduct();
  }

  getProductsWithCart() {
    this.http
      .get('http://127.0.0.1:8000/accounts/products/')
      .subscribe((resultdata: any) => {
        this.ProductArray = resultdata;
        this.mensArray = this.ProductArray.filter((product: any) => {
          return product.category == 'men';
        });
        this.womensArray = this.ProductArray.filter((product: any) => {
          return product.category == 'women';
        });
        this.kidsArray = this.ProductArray.filter((product: any) => {
          return product.category == 'Kids';
        });
        this.ifresult = true;

        this.http
          .get('http://127.0.0.1:8000/accounts/cart/')
          .subscribe((resultCart: any) => {
            for (
              let product = 0;
              product < this.ProductArray.length;
              product++
            ) {
              resultCart.forEach((cart: any) => {
                if (
                  cart.cartId == this.ProductArray[product].id &&
                  this.user_id == cart.username
                ) {
                  this.ProductArray[product].addedtocart = true;
                }
              });
            }
          });
      });
  }

  getproduct() {
    this.http
      .get('http://127.0.0.1:8000/accounts/products/')
      .subscribe((resultdata: any) => {
        this.ProductArray = resultdata;
        this.ifresult = true;
      });
  }

  addtocart(item: any) {
    let product: any = {
      username: this.user_id,
      product: item.product,
      quantity: 1,
      price: item.price,
      imageurl: item.imageurl,
      cartId: item.id,
    };
    if (this.token) {
      this.http
        .post('http://127.0.0.1:8000/accounts/cart/', product)
        .subscribe(() => {
          this.getProductsWithCart();
          this.cartState.increaseCartSize();
          alert('Product added to cart');
        });
    } else {
      alert('You are not logged in!');
      this.router.navigateByUrl('/login');
    }
  }

  buyed(product: any) {
    let ordered: any = {
      username: this.user_id,
      product: product.product,
      quantity: 1,
      price: product.price,
      imageurl: product.imageurl,
    };
    this.http
      .post('http://127.0.0.1:8000/accounts/order/', ordered)
      .subscribe(() => {
        alert('Order Placed!');
        this.router.navigateByUrl('/order');
      });
  }

  searchProduct() {
    this.showsearch = true;
    if (this.searchTerm == '') {
      this.showsearch = false;
      this.getproduct();
      return;
    } else {
      this.filteredArray = this.ProductArray.filter((product: any) => {
        return (
          product.product
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      });
    }
  }
}
