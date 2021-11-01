import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Heroe } from "../models/heroe";

export const heroes = (state) => state.heroe;

export const heroList = createSelector(
    createFeatureSelector('heroe'),
    heroes,
    ( heroes: Heroe[] ) => {
        return heroes;
    },
);