# Angular NgRx y store para guardar datos
Angular 10 app - Marvel API, ngrx

# Pasos previos
Asumiremos que, tenemos instalado [Node.js](https://nodejs.org/es/download/)
Lo que podemos revisar:
```
> node -v

```

Asi tambien que tenemos instalado el Angular CLI para la creacion y mantencion de proyectos
Se puede instalar a traves de npm:
```
> npm install -g @angular/cli
```
Y revisar:
ng -v


## Que es ngrx
NgRx es un framework para construir aplicaciones reactivas en Angular con un sistema de manejo de estados.
Su idea es establecer un estado y almacenarlo en un store, en el cual puede ser accesado y sobreescrito.

## Instalacion de NgRx
Primeramente para asegurarnos que tenemos las dependencias en orden, ejecutaremos npm install en la raiz de nuestro proyecto. Asumiendo que tenemos un proyecto ya armado.
```
> npm install
```

Y luego instalamos ngrx en nuestro proyecto, por esta ocasion con npm
```
> npm install @ngrx/store --save
```

Como nota: Tener en consideracion que usando versiones no actuales del Angular CLI, es posible tener que instalar versiones anteriores.
```
> npm install @ngrx/store@10.0.0
```

## Integrando al proyecto
En su arquitectura mas basica, NgRx usa 3 bloques constructores.

### Acciones:
Las cuales usan eventos unicos que se seleccionan dentro de la aplicacion, con la intencion de modificar o manejar el estado. Las acciones seran llamadas entonces, para ejecutar un Reducer.
```
import { Heroe } from '../models/heroe';
import { createAction, props } from '@ngrx/store'

export const nextPage = createAction('Next Page', props<{page: number}>());
export const prevPage = createAction('Prev Page', props<{page: number}>());

export const saveHeroes = createAction('Save Heroes', props<{heroe: Heroe[]}>());
export const saveTeam = createAction('Save Team', props<{heroe: Heroe}>());
export const getHeroes = createAction('Get Heroes');
```
Se crean a traves del metodo createAction de @ngrx/store, el cual solicitara una denominacion para la accion, y opcionalmente un prop (debe ser importado tambien desde @ngrx/store), el cual sera entregado luego al Reducer.

Notar que los props, seran demandados en el reducer y deben entregar el tipado correcto.

### Reducers
Los Reducers o funciones reductoras, son las encargadas de manejar las transiciones de un estado al siguiente.

```
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
    )
)
```
Se crean a traves de createReducer que viene de @ngrx/store. Dentro de este create reducer, se puede establecer el manejo de estado, esto con on (@ngrx/store), que permitira, designar la accion que lo desencadena (importada desde ts de acciones) y un callback, al cual podemos alimentarle el estado actual y los props designados.

Esto para establecer el estado anterior y el estado al cual queremos cambiar.

Como Nota, tener en consideracion que state es inmutable, asi que para manejarlo deberemos retornar un objeto que contenga copia del state y este haya sido modificado, no es factible acceder directamente al state para modificarlo.

### Selectors
Los Selectores son funciones usadas para obtener el state y leerlo.

```
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
```
createSelector, nos permite usar herolist como selector, que memorizara el estado. 

### En Componentes y Servicios
Una vez establecidos estos bloques, debemos, realizar algunos pasos:

1. Debemos agregar el StoreModule a app.module.ts, agregarla a imports con el reducer o reducers que se vayan a utilizar:

```
 imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({heroe: marvelReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
```

2. Debemos importar las acciones y selectores que se vayan a utilizar en los diferentes componentes o servicios. Asi tambien debe ser importado el Store, para poder llamar los metodos que interactuan con las acciones y selectores.

```
import { select, Store } from '@ngrx/store';
import { saveHeroes } from '../store/marvel.actions';
```

3. Con eso listo, debemos utilizarlas para modificar o leer el state, por ejemplo al momento de traer el listado de heroes de la aplicacion actual, tambien lanzamos un dispatch que activa la accion y manda al reducer a reemplazar el estado:
```
this.store.dispatch(saveHeroes({heroe: this.heroes}));

```
Esto guardara el array resultante como state ya que se va al reducer de SaveHeroes.

Asi tambien, se puede utilizar un selector para traer datos del estado:
```
this.allheroes$ = this.store.pipe(select(heroList));
      this.allheroes$.subscribe((data) => {
      this.heroListing = data;
    });
```

4. Si bien existe la opcion de guardar los datos del state dentro del mismo componente, tambien se pueden usar directo desde el selector que los trae, sin embargo al llevarlos al template deben ser llamados con el pipe async

```
<div  *ngFor="let heroe of heroList | async">
```

### NgRX Store devtools
Existe una herramienta de desarrollo, @ngrx/store-devtools, este consiste de 2 partes, la instalacion en el repo del proyecto:
```
npm install @ngrx/store-devtools --save
```
Junto con su importacion, en app.module.ts:
```
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({heroe: marvelReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  ```
  StoreDevtoolsModule.instrument(), tiene varias configuraciones. Documentacion (https://ngrx.io/guide/store-devtools/config).

  Luego de esto, devemos instalar la extension Redux DevTools (https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es) en Google Chrome. Esto permitira realizar monitoreo y manipulacion en tiempo real del state de la aplicacion mientras se ejecuta. 
  Para hacerlo se debera abrir Devtools en el browser donde este corriendo la aplicacion y buscar el tab Redux.

  
