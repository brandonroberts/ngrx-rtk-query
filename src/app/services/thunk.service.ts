import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThunkAction } from '@reduxjs/toolkit';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThunkService {
  constructor(private store: Store) {}

  dispatch(thunkAction: ThunkAction<any, any, any, any>) {
    const getState = () => {
      let state: object;

      this.store.pipe(take(1)).subscribe((res) => {
        state = res;
      });
      return state;
    };

    thunkAction(
      (thunk: ThunkAction<any, any, any, any>) =>
        thunk(this.store.dispatch.bind(this.store), getState, undefined),
      getState,
      undefined
    );
  }
}
