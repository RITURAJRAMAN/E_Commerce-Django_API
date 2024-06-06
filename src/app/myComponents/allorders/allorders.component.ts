import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  orderItems: any = [];

  constructor(private http: HttpClient) {
  }

  user: any;

  ngOnInit(): void {
    this.getOrderList();
  }

  getuseremail(user_id: any) {
    this.http
      .get(`http://127.0.0.1:8000/accounts/user/${user_id}/`)
      .subscribe((resultdata: any) => {
        this.user = resultdata;
      });
  }

  getOrderList() {
    this.http
      .get('http://127.0.0.1:8000/accounts/order/')
      .subscribe((resultdata: any) => {
        this.orderItems = resultdata;
        console.log(resultdata);
      });
  }
}
