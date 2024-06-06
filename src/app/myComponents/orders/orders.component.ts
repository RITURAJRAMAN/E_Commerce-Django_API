import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { OrderItem } from 'src/app/myInterface/order-item';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderItems: any = [];
  token: any;
  user_id: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    let decoded: any = jwtDecode<JwtPayload>(this.token);
    this.user_id = decoded.user_id.toString();
    this.getOrderList();
  }

  getOrderList() {
    this.http
      .get('http://127.0.0.1:8000/accounts/order/')
      .subscribe((resultdata: any) => {
        this.orderItems = resultdata.filter(
          (item: any) => item.username === this.user_id
        );
        // console.log(this.orderItems);
      });
  }
}
