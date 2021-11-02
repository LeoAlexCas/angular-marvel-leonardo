import { createReducer, on } from '@ngrx/store';
import { Heroe } from '../models/heroe';
import { getHeroes, saveHeroes, saveTeam } from './marvel.actions';

export interface State {
    heroe: Heroe[]
}
export let initialState: State;
initialState.heroe = [];

export const marvelReducer = createReducer(
    initialState,
    on(saveHeroes, (state , { heroe }) => {
        let heroes = {...state};
        heroes.heroe = heroe;

        return heroes;
        }
    ),
    on(saveTeam, (state, { heroe }) => {
        let heroes = {...state};
        let actuelHeroes: Heroe[];
        let index;

        actuelHeroes = heroes.heroe;

        //aca podria ir un for each
        for(let i = 0; i < heroes.heroe.length; i++) {
            if(heroes[i].id == heroe.id) {
                index = i;
            }
        };
        actuelHeroes[index] = heroe;

        return heroes;
    }),

    
)