import { createReducer, on } from '@ngrx/store';
import { Heroe } from '../models/heroe';
import { saveHeroes } from './marvel.actions';

export let initialState: Heroe[];
initialState = [];

export const marvelReducer = createReducer(
    initialState,
    on(saveHeroes, (state , { heroe }) => {
        let heroes = {...state};
        heroes = heroe;

        return heroes;
        }
    )
)