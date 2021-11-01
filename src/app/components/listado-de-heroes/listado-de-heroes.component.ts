import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.css']
})
export class ListadoDeHeroesComponent implements OnInit {

  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString;
  // The child component : spinner
  @ViewChild('spi') spinner;
  /* public heroes: Array<Heroe> = []; */

  constructor(public heroesService: HeroesService, 
              private router:Router,
              private store: Store
              ) { }

  submitSearch() {
    this.heroesService.resetPager();
    this.heroesService.getHeroes(this.searchString);
  }

  prevPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
  }
    
  nextPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
  }

  go_to(id){
    this.router.navigateByUrl('/heroe/'+id);
  }

  ngOnInit() {
    this.heroesService.getHeroes();
  }

}
