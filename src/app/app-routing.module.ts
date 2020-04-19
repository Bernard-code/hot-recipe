import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { AppPlanComponent } from './components/app-plan/app-plan.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddMealComponent},
  {path: 'app-plan', component: AppPlanComponent},
  {path: 'recipe-edit/:id', component: RecipeEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
