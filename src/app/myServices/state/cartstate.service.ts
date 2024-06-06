import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartstateService {

  private cartState = new BehaviorSubject<number>(0);
  currCartState = this.cartState.asObservable();

  constructor() {}

  changeCartState(newState: number) {
    this.cartState.next(newState);
  }

  increaseCartSize(){
    this.cartState.next(this.cartState.value + 1);
  }
  decreaseCartSize(){
    this.cartState.next(this.cartState.value - 1);
  }
}
