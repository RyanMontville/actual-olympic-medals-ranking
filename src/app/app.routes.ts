import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AthleteListComponent } from './athlete-list/athlete-list.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'athletes', component:AthleteListComponent},
    {path: '**', component: HomeComponent},
];
