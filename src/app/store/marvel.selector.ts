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

export const heroTeam = (heroId: string) => createSelector(
    createFeatureSelector('heroTeam'),
    (hero: Heroe[]) => {
        let selected = hero.filter( arrHero => {
            if(arrHero.id  == heroId) {
                return arrHero.teamColor;
            }
        });
        return selected;
    }
);