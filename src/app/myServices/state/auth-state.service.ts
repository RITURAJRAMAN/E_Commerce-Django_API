import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authState = new BehaviorSubject<boolean>(false);
  currAuthState = this.authState.asObservable();

  constructor() {}

  changeAuthState(newState: boolean) {
    this.authState.next(newState);
  }
}
