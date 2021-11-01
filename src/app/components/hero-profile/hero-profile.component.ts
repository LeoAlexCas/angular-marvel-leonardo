import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Heroe } from '../../models/heroe';
import { HeroesService } from '../../services/heroes.service';
import { Location } from '@angular/common';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { saveTeam } from '../../store/marvel.actions';

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


  constructor(private route: ActivatedRoute,
              private heroesService: HeroesService, 
              private _location: Location,
              private store: Store) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.heroesService.getHeroe(this.id).subscribe(data => {
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

        
      });
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
    //this.question_modal="¿Dónde ubicarías a tu súper héroe?";
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }

}
