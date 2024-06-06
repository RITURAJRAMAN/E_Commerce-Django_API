import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AuthStateService } from 'src/app/myServices/state/auth-state.service';
import { CartstateService } from 'src/app/myServices/state/cartstate.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loginstat: boolean = false;
  token: any;
  cartSize: number = 0;
  user_id: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authState: AuthStateService,
    private cartState: CartstateService
  ) {}

  ngOnInit(): void {
    this.authState.currAuthState.subscribe((state) => (this.loginstat = state));
    this.cartState.currCartState.subscribe((state) => (this.cartSize = state));
    this.token = localStorage.getItem('token');
    if (this.token && this.token !== '') {
      let decoded: any = jwtDecode<JwtPayload>(this.token);
      this.user_id = decoded.user_id;
      this.authState.changeAuthState(true);
      this.http
        .get('http://127.0.0.1:8000/accounts/cart/')
        .subscribe((resultdata: any) => {
          this.cartState.changeCartState(
            resultdata.filter(
              (item: any) => item.username === this.user_id.toString()
            ).length
          );
        });
    } else {
      this.cartState.changeCartState(0);
      this.authState.changeAuthState(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.changeAuthState(false);
    this.router.navigateByUrl('');
  }
}
