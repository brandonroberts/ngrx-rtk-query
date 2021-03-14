import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { pokemonThunkActionCreator, selectPokemon } from './services/pokemon';
import { ThunkService } from './services/thunk.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngrx-rtk-query';
  data = this.store.select(selectPokemon('bulbasaur'))

  constructor(private store: Store, private dispatcher: ThunkService) {}

  ngOnInit() {
    this.dispatcher.dispatch(pokemonThunkActionCreator('bulbasaur'));
  }
}
