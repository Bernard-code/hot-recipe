import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { DialogComponent } from './components/home/recipe/dialog/dialog.component';
import { RecipeComponent } from './components/home/recipe/recipe.component';
import { NavComponent } from './components/nav/nav.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { CaptureImgComponent } from './components/add-meal/capture-img/capture-img.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    DialogComponent,
    RecipeComponent,
    NavComponent,
    AddMealComponent,
    AppPlanComponent,
    CaptureImgComponent
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
    WebcamModule
  ],
  providers: [
   // {
   //   provide: MatDialogRef,
   //   useValue: {}
   //  },
   //  DialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
