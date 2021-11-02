import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { HeroesService } from '../../services/heroes.service';
import { Store } from '@ngrx/store';

import { HeroProfileComponent } from '../hero-profile/hero-profile.component';
import {RouterTestingModule} from '@angular/router/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { Observable } from 'rxjs-compat';
import { of } from 'rxjs';

import { ListadoDeHeroesComponent } from './listado-de-heroes.component';

describe('ListadoDeHeroesComponent', () => {
  let component: ListadoDeHeroesComponent;
  let fixture: ComponentFixture<ListadoDeHeroesComponent>;

  let heroesService: HeroesService;
  const HEROE_OBJECT ={
    id:'1',
    name:'Spiderman',
    description: 'El hombre que araña',
    modified:new Date(1518417160),
    thumbnail:
      {
        'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
        'extension': 'jpg'
      },
    resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
    teamColor:'yellow'};
 
  class HeroServiceMock {
    public teams = new Map().set("1","yellow");

    public getHeroe(){
      return Observable.of({data:{results:HEROE_OBJECT}}).delay(1000);
    }

    public getTeamColor(){
      return "yellow";
      }
    }

    const storeMock = {
      select() {
        return of([{
          id:'1',
          name:'Spiderman',
          description: 'El hombre que araña',
          modified:new Date(1518417160),
          thumbnail:
            {
              'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
              'extension': 'jpg'
            },
          resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
          teamColor:'yellow'}]);
      }
    };

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
        { provide: Store, useValue: storeMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListadoDeHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
