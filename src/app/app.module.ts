import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoDeHeroesComponent } from './components/listado-de-heroes/listado-de-heroes.component';
import { HeroesService } from './services/heroes.service';
import { HeroProfileComponent } from './components/hero-profile/hero-profile.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalPollComponent } from './components/modal-poll/modal-poll.component';
import { CapitalizePipe } from './directives/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListadoDeHeroesComponent,
    HeroProfileComponent,
    SpinnerComponent,
    ModalPollComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
