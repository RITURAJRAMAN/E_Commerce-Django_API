import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AuthStateService } from 'src/app/myServices/state/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editimagestatus = true;
  token: any;
  loginstat: boolean = false;
  UserArray: any = [];
  user_id: any;
  edits = true;
  imgurl: any;
  image: any;

  constructor(
    private http: HttpClient,
    private authState: AuthStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authState.currAuthState.subscribe((state) => (this.loginstat = state));
    this.token = localStorage.getItem('token');
    let decoded: any = jwtDecode<JwtPayload>(this.token);
    this.user_id = decoded.user_id;
    if (this.token != null) {
      this.authState.changeAuthState(true);
    }
    this.getprofile();
  }

  getprofile() {
    this.http
      .get(`http://127.0.0.1:8000/accounts/user/${this.user_id}/`)
      .subscribe((resultdata: any) => {
        this.UserArray = resultdata;
      });
    this.http
      .get(`http://127.0.0.1:8000/accounts/profile/${this.user_id}/`)
      .subscribe((resultdata: any) => {
        this.imgurl = resultdata;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.changeAuthState(false);
    this.router.navigateByUrl('');
  }

  editprofile() {
    this.edits = !this.edits;
  }

  saveprofile() {
    this.http
      .put(
        `https://localhost:7093/api/Users?id=${this.UserArray.id}`,
        this.UserArray
      )
      .subscribe((resultdata: any) => {
        this.UserArray = resultdata;
      });
    this.editprofile();
    this.getprofile();
  }
  editimage() {
    this.editimagestatus = !this.editimagestatus;
  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  saveimage() {
    if (this.image == '') {
      alert('Please select a file');
    } else {
      const body = new FormData();
      body.append('img', this.image);
      body.append('id', this.user_id);

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');

      if (this.imgurl != null) {
        this.http
          .put(`http://127.0.0.1:8000/accounts/profile/${this.user_id}/`, body)
          .subscribe(() => {
            this.editimage();
            this.getprofile();
          });
      } else {
        this.http
          .post(`http://127.0.0.1:8000/accounts/profile/`, body)
          .subscribe(() => {
            this.editimage();
            this.getprofile();
          });
      }
    }
  }
}
