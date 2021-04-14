import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MiddlewareAPI, ThunkAction } from '@reduxjs/toolkit';
import { SubscriptionLike } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThunkService {
  constructor(private store: Store) {}

  getState() {
    let state: object;

    this.store.pipe(take(1)).subscribe((res) => {
      state = res;
    });

    return state;
  }

  dispatch(thunkAction: ThunkAction<any, any, any, any>): SubscriptionLike {
    return thunkAction(
      (thunk: ThunkAction<any, any, any, any>) =>
        thunk(this.store.dispatch.bind(this.store), this.getState.bind(this), undefined),
      this.getState.bind(this),
      undefined
    );
  }

  runThunk(thunk: ThunkAction<any, any, any, any>) {
    return thunk(
      this.store.dispatch.bind(this.store),
      this.getState.bind(this),
      undefined
    );
  }

  middlewareApi(): MiddlewareAPI {
    return {
      dispatch: this.runThunk.bind(this),
      getState: this.getState.bind(this),
    };
  }
}
