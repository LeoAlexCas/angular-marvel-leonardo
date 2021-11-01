import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Heroe } from "../models/heroe";

export const heroList = createSelector(
    createFeatureSelector('heroes'),
    () => {
        
    }
);