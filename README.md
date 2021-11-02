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
  StoreDevtoolsModule.instrument(), tiene varias configuraciones. [Documentacion](https://ngrx.io/guide/store-devtools/config).

  Luego de esto, devemos instalar la extension [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es) en Google Chrome. Esto permitira realizar monitoreo y manipulacion en tiempo real del state de la aplicacion mientras se ejecuta. 
  Para hacerlo se debera abrir Devtools en el browser donde este corriendo la aplicacion y buscar el tab Redux.

  
### Testing
En esta aplicacion ocuparemos Jasmine junto con Karma, que, si es que el proyecto se inicio desde el angular CLI, deberia venir integrado y con test pre establecidos.

Para esto debemos configurar Karma. Si utilizamos el integrado, no sera necesario importar librerias ni modulos. Sin embargo si se desean hacer test con PhantomJs y puppeteer, se deberan instalar dichos modulos.

Con esto podriamos incluso ya correr 

```
ng test
```
Esto correria los test, que en una aplicacion de angular sin trabajar, estaran todos pasados.

Sin embargo cuando los componentes, servicios y clases se hacen mas complejos, es necesario dar ciertas configuraciones.

1. Componentes:
A los componentes se le deben importar todas las dependencias que sean necesarias para su funcionamiento, incluyendo otros componentes.
Esto en el primer BeforeEach, que a traves de testBed, configura al igual que lo haria con cualquier modulo:
```
 beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        AppComponent,
        ModalPollComponent,
        HeroProfileComponent
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: HeroesService, useClass: HeroServiceMock },
        { provide: Store, useValue: storeMock },
        { provide: Location, useClass: LocationMock}
      ]
    })
    .compileComponents();
  }));
```

Esto y los demas elementos del test, van dentro de un "describe", una funcion que permite crear un grupo de specs, entregandole un nombre para la suite que vamos a armar y una funcion que implementa la suite.
```
describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;

  let heroesService: HeroesService;

```

Dependiendo de los test deberemos ir implementando diferentes modulos, por ejemplo en nuestro caso de hero.
Ejemplo de como se veria el BeforeEach de hero-profile.component.spec.ts:

```
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        AppComponent,
        ModalPollComponent,
        HeroProfileComponent
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: HeroesService, useClass: HeroServiceMock },
        { provide: Store, useValue: storeMock },
        { provide: Location, useClass: LocationMock}
      ]
    })
    .compileComponents();
  }));
  ```
  Como Nota aca se traen SCHEMAS, se importa el router testingModule, y se traen providers para el uso en los distintos test. ComponentFixtureAutoDetect que crea un wrapper entre componente y template para poder realizar testing, HeroesService, para evaluar los metodos que deban usar el heroService. Location, para poder testear el metodo que devuelve pagina.

  Luego de esto, en el segundo beforeEach, podemos establecer parametros, como el mixture que utilizaremos, y luego en el metodo it, deberemos especificar, el nombre del test y su funcionalidad:

  ```
   beforeEach(async() => {
    heroesService = TestBed.get(HeroesService);
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it('Debería crear el heroe', () => {
    const spy = spyOn(heroesService, 'getHeroe').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });  
  ```

  Entonces it, recibe como parametros el nombre del test y una funcion que determinara que se testea,
  por ejemplo, should create llama al mixture del componente actual y expera que sea truthy con toBeTruthy()
  ```
   it('should create', async() => {
    expect(component).toBeTruthy();
  });
  ```

  Estos test tambien pueden evaluar interacciones con otros componentes como si puede disparar un servicio:
  ```
  it('Debería crear el heroe', () => {
    const spy = spyOn(heroesService, 'getHeroe').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });  
```
En estos casos tenemos spyOn que reemplaza un metodo y lo observa, pero delega su ejecucion, en este caso espiando al heroesService get Heroe, luego inicializamos el componente y experamos que este metodo haya sido llamado.

2. Service:
Si bien los servicios se implementan mas o menos igual en lo que es testing, al punto que podrias usar incluso la misma configuracion de un componente en el beforeEach, no tiene acceso a ngOnInit puesto que no es un componente. 
Se da en los servicios que puede existir algun metodo que fije una variable, pero regrese void. En este caso es recomendable entonces, al hacer spy en dicho metodo, pero solicitar que se corrobore la variable:
```
it('should test getHeroes function', () => {
    heroesService.getHeroes = jasmine.createSpy('getHeroes').and.callThrough(); 
    heroesService.getHeroes('', 1);
    expect(heroesService.getHeroes).toHaveBeenCalled();
    expect(heroesService.heroes).toBeDefined();
  });

```

3. Pipe:
Los pipes deben ser corridos en los componentes relacionados al componente que lo usa. Es factible realizar test en las directivas para saber que se estan cumpliendo. En este caso particular, no existen demasiadas importaciones, si no mas bien casos de test con un string ingresado:

```
import { CapitalizePipe } from './capitalize.pipe';
import { TestBed, inject, async } from '@angular/core/testing';

describe('CapitalizePipe', () => {
  let pipe;
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ CapitalizePipe ]
  }));
  
  beforeEach(inject([CapitalizePipe], (p:CapitalizePipe) => {
    pipe = p;
  }));
  
  it('crea la instancia', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería funcionar con un string vacío', () => {
    expect(pipe.transform('')).toEqual('');
  });
  
  it('debería realizar la transformación de Capitalize', () => {
    expect(pipe.transform('wow')).toEqual('WOW');
  });
  
  it('debería lanzar error por valores inválidos', () => {
    expect(()=>pipe.transform(undefined)).toThrow();
    expect(()=>pipe.transform()).toThrow();
    expect(()=>pipe.transform()).toThrowError('Requires a String as input');
  });
});
```