import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Heroe } from '../../models/heroe';
import { HeroesService } from '../../services/heroes.service';
import { Location } from '@angular/common';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { getHeroes, saveTeam } from '../../store/marvel.actions';
import { heroList } from '../../store/marvel.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements OnInit {
  @ViewChild('modal') modal;
  private id;
  public heroe: Heroe;
  public question_modal: string;
  public team:string = "";
  public allheroes$:Observable<Heroe[]>
  public heroListing: Heroe[];


  constructor(private route: ActivatedRoute,
              private heroesService: HeroesService, 
              private _location: Location,
              private store: Store) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.id = params.id;

    this.callHeroe(this.id)
    });

  }

  callHeroe(id: number) {
    this.heroesService.getHeroe(id).subscribe(data => {
      const temp = data.data.results[0];
      this.heroe = {
        id : temp.id,
        name : temp.name,
        description : temp.description,
        modified : temp.modified,
        thumbnail : temp.thumbnail,
        resourceURI : temp.resourceURI,
        teamColor : this.heroesService.getTeamColor(temp.id)
      } 
      console.log("Tiene equipo?");
      console.log(this.heroe);
      console.log(this.heroe.teamColor);
      this.team = this.heroe.teamColor;
      return this.heroe;
    }); 
  }

  goBack() {
    this._location.back();
  }

  getTeam(team):void{
    console.log("Color: "+team);
    this.team = team;
    this.heroesService.teams.set(this.heroe.id, this.team);
    this.store.dispatch(saveTeam({ heroe: this.heroe }))
  }

  launchModal():void{
    this.question_modal="??En cual grupo quieres colocar a tu s??per h??roe?";
    this.modal.toggle_modal();
  }

}
