import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../models/heroe';
import { select, Store } from '@ngrx/store';
import { saveHeroes } from '../store/marvel.actions';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HeroesService {

  private protocol = environment.API_PROTOCOL;
  private ApiUrl = environment.API_BASE_URL;
  private apiKey = environment.API_KEY;
  public heroes: Heroe[];

  public page = 0;
  public step = 20;
  public total = 0;

  public searchString = '';

  public hero: Heroe;
  public teamColor$: Observable<Heroe>;

  public group_colors = {"azul" : "#1f8ff7",
                        "violeta":"#a43de3",
                        "naranjo":"#df5c0f",
                        "verde":"#0ea521"}
  
  public teams = new Map();

  constructor(
    private http: HttpClient,
    private store: Store
    ) { }

  resetPager() {
    this.page = 0;
  }

  setSearchString(search: string) {
    this.searchString = search;
  }

  getHeroes(nameStartsWith?: string, page?: number) {
    console.log("TEAMS");
    console.log(Array.from(this.teams));
    if (page || page === 0) {
      this.page = page;
    }
    const url = this.protocol + this.ApiUrl + this.apiKey
    + '&offset=' + (this.page * this.step)
    + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
    this.http.get<any>(url).subscribe((data) => {
      this.heroes = [];
      this.total = Math.ceil(data.data.total / this.step);
      data.data.results.forEach( result => {
        this.hero = {
          id: '',
          name: '',
          description: '',
          resourceURI: '',
          teamColor: ''
        }; 

        this.hero.id = result.id;
        this.hero.name = result.name;
        this.hero.description = result.description;
        this.hero.modified = result.modified;
        this.hero.thumbnail = result.thumbnail;
        this.hero.resourceURI = result.resourceURI;    

        this.hero.teamColor = this.getTeamColor(result.id);

        this.heroes.push(this.hero);
        },
      );
      this.store.dispatch(saveHeroes({heroe: this.heroes}));
    });
  }

  getHeroe(id: number) {
    const url = this.protocol + this.ApiUrl + 'characters/' + id + '?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b';
    return this.http.get<any>(url);
  }

  getTeamColor(id):string{
    if(this.teams.get(id)!=undefined){
      return this.teams.get(id);
    }
    else{
      return "";
    }
  }

}
