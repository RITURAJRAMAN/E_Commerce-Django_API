import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name = new FormControl('', Validators.required);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{5,}'),
  ]);
  password2 = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{5,}'),
  ]);
  // tc = new FormControl('', Validators.required);
  tc = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  adduser() {
    let bodyData = {
      email: this.email.value,
      name: this.name.value,
      password: this.password.value,
      password2: this.password2.value,
      tc: this.tc,
    };
    console.log(bodyData);
    this.http
      .post('http://127.0.0.1:8000/accounts/register/', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('SignUp Successfull!');
        this.router.navigateByUrl('/login');
      });
  }
}
