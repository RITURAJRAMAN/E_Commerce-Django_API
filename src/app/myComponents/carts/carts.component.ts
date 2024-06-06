import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {CartstateService} from 'src/app/myServices/state/cartstate.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent implements OnInit {
  cartItems: any = [];
  token: any;
  user_id: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartState: CartstateService
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    let decoded: any = jwtDecode<JwtPayload>(this.token);
    this.user_id = decoded.user_id.toString();
    this.getCartItems();
  }

  getCartItems() {
    this.http
      .get('http://127.0.0.1:8000/accounts/cart/')
      .subscribe((resultdata: any) => {
        this.cartItems = resultdata.filter(
          (item: any) => item.username === this.user_id
        );
      });
  }

  decreaseQuantity(id: number) {
    this.cartItems = this.cartItems
      .map((item: any) => {
        if (item.id === id) {
          item.quantity--;
          if (item.quantity < 0) {
            item.quantity = 0;
          }
          if (item.quantity === 0) {
            this.removeFromCart(id);
            return null;
          }
        }
        this.updateCart(id);
        return item;
      })
      .filter((item: any) => item !== null);
  }

  increaseQuantity(id: number) {
    this.cartItems = this.cartItems.map((item: any) => {
      if (item.id === id) {
        if (item.quantity > 0) {
          item.quantity++;
        }
      }
      this.updateCart(id);
      return item;
    });
  }

  updateCart(id: any) {
    this.http
      .put(
        `http://127.0.0.1:8000/accounts/cart/${id}/`,
        this.cartItems.find((i: any) => i.id === id)
      )
      .subscribe(() => {
        this.getCartItems();
      });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total: number, item: any) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  removeFromCart(id: any) {
    this.http
      .delete(`http://127.0.0.1:8000/accounts/cart/${id}/`)
      .subscribe(() => {
        this.getCartItems();
        this.cartState.decreaseCartSize();
      });
  }

  checkedout() {
    this.cartItems.forEach((i: any) => {
      this.http
        .delete(`http://127.0.0.1:8000/accounts/cart/${i.id}/`)
        .subscribe(() => {
          let product: any = {
            username: i.username,
            product: i.product,
            quantity: i.quantity,
            price: i.price,
            imageurl: i.imageurl,
          };
          this.http
            .post('http://127.0.0.1:8000/accounts/order/', product)
            .subscribe(() => {
              this.router.navigateByUrl('/order').then(() => window.location.reload());
            });
        });
    });
    alert('Order Placed!');
  }
}
