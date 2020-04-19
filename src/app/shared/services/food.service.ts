import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';
import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument  
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private itemsCollection: AngularFirestoreCollection<Meal>;
  private items: Observable<Meal[]>;
  private itemDoc: AngularFirestoreDocument<Meal>;

  constructor( 
    public db: AngularFirestore,
    public router: Router ) {
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

  getAllMeals() {
    return this.items;
  }

  getTheMeal(id: string) {
    this.itemDoc = this.db.doc(`meals/${id}`);   
    return this.itemDoc.snapshotChanges()
      .pipe(
        map( a => {
          const data = a.payload.data() as Meal;
          const id = a .payload.id;
          return { id, ...data }
        })
      )
  }

  addMeal(newMeal: Meal) {
    this.itemsCollection.add(newMeal).then(
      res => {
        this.router.navigate(['']);
      },
      err => {
        console.log(err)
      }
    );
  }

  deleteItem(delItemId: string) {
    this.itemDoc = this.db.doc(`meals/${delItemId}`);
    this.itemDoc.delete().then(
      res => {
        this.router.navigate(['']);
      },
      err => {
        console.log(err)
      }
    );
  }

  updateItem(upItem: Meal) {
    this.itemDoc = this.db.doc(`meals/${upItem.id}`);
    this.itemDoc.update(upItem).then(
      res => {
        this.router.navigate(['recipe-edit', upItem.id]);
      },
      err => {
        console.log(err)
      }
    );
  }
}
