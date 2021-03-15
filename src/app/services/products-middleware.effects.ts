import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { productsApi } from './products';
import { ThunkService } from './thunk.service';

@Injectable()
export class ProductsMiddlewareEffects {
  productsMiddleware$ = createEffect(
    () => {
      return this.actions$.pipe(
        tap((action) => {
          const next = productsApi.middleware(this.dispatcher.middlewareApi());
          const runMiddleware = next((action) => action);
          
          runMiddleware(action);
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private dispatcher: ThunkService) {}
}
