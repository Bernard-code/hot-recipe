import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { WebcamModule } from 'ngx-webcam';

import { AppPlanComponent } from './components/app-plan/app-plan.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SearchComponent } from './components/home/search/search.component';
import { RecipeComponent } from './components/home/recipe/recipe.component';
import { NavComponent } from './components/nav/nav.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { CaptureImgComponent } from './components/add-meal/capture-img/capture-img.component';
import { DeleteDialogComponent } from './components/recipe-edit/delete-dialog/delete-dialog.component';
import { ExpandDirective } from './shared/directives/expand.directive';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { FloorPipe } from './shared/pipes/floor.pipe';
import { OrderedListComponent } from './shared/components/ordered-list/ordered-list.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { RecipeOverviewComponent } from './components/recipe-page/recipe-overview/recipe-overview.component';
import { RecipeStepsComponent } from './components/recipe-page/recipe-steps/recipe-steps.component';
import { RecipeIngredientsComponent } from './components/recipe-page/recipe-ingredients/recipe-ingredients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    RecipeComponent,
    NavComponent,
    AddMealComponent,
    AppPlanComponent,
    CaptureImgComponent,
    DeleteDialogComponent,
    ExpandDirective,
    RecipeEditComponent,
    RecipePageComponent,
    FloorPipe,
    OrderedListComponent,
    TruncatePipe,
    RecipeOverviewComponent,
    RecipeStepsComponent,
    RecipeIngredientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireStorageModule,
    WebcamModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule { }
