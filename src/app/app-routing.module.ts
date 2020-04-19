import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { AppPlanComponent } from './components/app-plan/app-plan.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddMealComponent},
  {path: 'app-plan', component: AppPlanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
