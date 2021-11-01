import { createReducer, on } from '@ngrx/store';
import { Heroe } from '../models/heroe';
import { saveHeroes, saveTeam } from './marvel.actions';

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
        const stateModi: Heroe[] = {...state};
        let index;

        let i = stateModi.find(e => e.id == heroe.id);
        i?stateModi[index].teamColor = heroe.teamColor: '';
        
        return stateModi;
    })
)