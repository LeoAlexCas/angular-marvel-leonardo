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
