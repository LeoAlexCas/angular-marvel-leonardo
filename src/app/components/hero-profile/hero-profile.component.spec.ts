import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { HeroesService } from 'src/app/services/heroes.service';
import { heroes } from 'src/app/store/marvel.selector';

import { HeroProfileComponent } from './hero-profile.component';

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
      declarations: [ HeroProfileComponent ],
      providers: [
        {
          provide: ComponentFixtureAutoDetect,
        },
        {
          provide: HeroesService, useClass: HeroMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get heroes', () => {
    
  })
});
