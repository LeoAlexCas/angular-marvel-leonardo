import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listRoutingModule } from './hero-list-routing.module';
import { ListadoDeHeroesComponent } from './components/listado-de-heroes/listado-de-heroes.component';



@NgModule({
  declarations: [
    ListadoDeHeroesComponent
  ],
  imports: [
    CommonModule,
    listRoutingModule,
    listRoutingModule
  ]
})
export class HeroListModule { }
