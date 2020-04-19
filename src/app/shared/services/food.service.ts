import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private itemsCollection: AngularFirestoreCollection<Meal>;
  private items: Observable<Meal[]>;
  private itemDoc: AngularFirestoreDocument<Meal>;

  constructor( public db: AngularFirestore ) {
    this.itemsCollection = this.db.collection( 'meals', ref => ref.orderBy('timestamp', 'desc') );
    this.items = this.itemsCollection.snapshotChanges()
      .pipe(
        map( changes => {
          return changes.map( a => {
            const data = a.payload.doc.data() as Meal;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        })
      );
  }

  getMeals() {
    return this.items;
  }

  addMeal(newMeal: Meal) {
    this.itemsCollection.add(newMeal);
  }
}
