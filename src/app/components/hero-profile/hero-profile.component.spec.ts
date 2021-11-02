import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesService } from '../../services/heroes.service';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { StateObservable, ActionsSubject } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { HeroProfileComponent } from './hero-profile.component';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { AppComponent } from '../../app.component';
import { HttpClientModule } from '@angular/common/http';

describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;

  class HeroMock {
    getHeroeMock() {
      return [{
        id: 1011176,
        name: 'Ajak',
        description: '',
        resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011176',
        teamColor: '',
        modified: '1969-12-31T19:00:00-0500',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/2/80/4c002f35c5215',
          extension: 'jpg'
        }
      }];
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroProfileComponent, ModalPollComponent, AppComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: Store },
        { provide: ActionsSubject },
        { provide: StateObservable},
        { provide: Observable }, 
        { provide: HeroesService, useValue: {} },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  /*
  it('should get heroe', () => {
    const fixture = TestBed.createComponent(HeroProfileComponent);
    const actualComponent = fixture.componentInstance;
    actualComponent.ngOnInit();
    let hero = actualComponent.callHeroe(1011334);
    expect(hero).toBeTruthy();
  })
  */


});