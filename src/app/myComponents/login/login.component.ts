// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthStateService } from 'src/app/myServices/state/auth-state.service';
// import { CartstateService } from 'src/app/myServices/state/cartstate.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   email: string = '';
//   pass: string = '';
//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private authState: AuthStateService,
//     private cartState: CartstateService
//   ) {}

//   ngOnInit(): void {}

//   Authenticate() {
//     let bodyData = {
//       password: this.pass,
//       email: this.email,
//     };

//     this.http
//       .post('https://localhost:7093/api/Users/login', bodyData)
//       .subscribe((resultData: any) => {
//         // console.log(resultData.token)
//         localStorage.setItem('token', resultData.token);
//         this.authState.changeAuthState(true);

//         this.http
//         .get('https://localhost:7093/api/Carts')
//         .subscribe((resultdata: any) => {
//           this.cartState.changeCartState(
//             resultdata.filter((item: any) => item.username === this.email)
//               .length
//           );
//         });

//         this.router.navigateByUrl('/home');
//       });
//   }

//   forgpas() {
//     alert('Password modification not allowed!');
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/myServices/state/auth-state.service';
import { CartstateService } from 'src/app/myServices/state/cartstate.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token: any;
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    Validators.email,
  ]);
  // pass = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{5,}'),
  // ]);
  pass = new FormControl('', Validators.required);
  constructor(
    private http: HttpClient,
    private router: Router,
    private authState: AuthStateService,
    private cartState: CartstateService
  ) {}

  ngOnInit(): void {}

  Authenticate() {
    let bodyData = {
      password: this.pass.value,
      email: this.email.value,
    };

    this.http
      .post('http://127.0.0.1:8000/accounts/login/', bodyData)
      .subscribe((result: any) => {
        this.token = result.token.refresh;
        localStorage.setItem('token', result.token.refresh);
        console.log(this.token);
        this.authState.changeAuthState(true);

        this.http
          .get('http://127.0.0.1:8000/accounts/cart/')
          .subscribe((resultData: any) => {
            this.cartState.changeCartState(
              resultData.filter(
                (item: any) => item.username === this.email.value
              ).length
            );
          });

        this.router.navigateByUrl('/');
      });
  }

  forgpas() {
    alert('Password modification not allowed!');
  }
}
