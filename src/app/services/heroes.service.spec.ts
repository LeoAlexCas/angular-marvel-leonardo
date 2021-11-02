import { TestBed, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { HeroProfileComponent } from '../components/hero-profile/hero-profile.component';
import {RouterTestingModule} from '@angular/router/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from '../app.component';
import { ModalPollComponent } from '../components/modal-poll/modal-poll.component';
import { Observable } from 'rxjs-compat';
import { of } from 'rxjs';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
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
  beforeEach(() => {
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
    });
  });

  it('should be created', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));

  it('Deberia responder', inject([HeroesService], (service: HeroesService) => {
    expect(service.getHeroes).toBeTruthy();
  }));

  it('should test getHeroes function', inject([HeroesService], (service: HeroesService) => {
    spyOn(service, 'getHeroes').and.callThrough();
    service.getHeroes;
    expect(service.getHeroes).toHaveBeenCalled();
    expect(service.heroes).toBeDefined();
}));


});
