import { createReducer, on } from '@ngrx/store';
import { Heroe } from '../models/heroe';
import { getHeroes, saveHeroes, saveTeam } from './marvel.actions';

export let initialState: Heroe[];
initialState = [];

export const marvelReducer = createReducer(
    initialState,
    on(saveHeroes, (state , { heroe }) => {
        let heroes = {...state};
        heroes = heroe;

        return heroes;
        }
    ),
    on(saveTeam, (state, { heroe }) => {
        let heroes = {...state};
        let actuelHeroes: Heroe[];
        let index;

        actuelHeroes = heroes;

        //aca podria ir un for each
        for(let i = 0; i < heroes.length; i++) {
            if(heroes[i].id == heroe.id) {
                index = i;
            }
        };
        actuelHeroes[index] = heroe;

        return heroes;
    }),
    on(getHeroes, (state) => {
        return [...state];
    }),
    
)