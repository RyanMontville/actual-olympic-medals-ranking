import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AthleteDetailComponent } from './athlete-detail/athlete-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'athletes/:name', component: AthleteDetailComponent},
    {path: '**', component: HomeComponent},
];
