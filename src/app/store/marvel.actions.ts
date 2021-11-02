import { Heroe } from '../models/heroe';
import { createAction, props } from '@ngrx/store'

export const nextPage = createAction('Next Page', props<{page: number}>());
export const prevPage = createAction('Prev Page', props<{page: number}>());

export const saveHeroes = createAction('Save Heroes', props<{heroe: Heroe[]}>());
export const saveTeam = createAction('Save Team', props<{heroe: Heroe}>());
export const getHeroes = createAction('Get Heroes');
