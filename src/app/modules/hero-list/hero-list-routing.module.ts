import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoDeHeroesComponent } from './components/listado-de-heroes/listado-de-heroes.component';

const routes: Routes = [
    {
        path: '',
        component: ListadoDeHeroesComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class listRoutingModule {

}