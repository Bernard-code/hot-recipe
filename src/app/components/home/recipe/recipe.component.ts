import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from '../../../shared/models/meal.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  @Input() meal:Meal;
  mealImage$: Observable<string | null>;

  ngOnInit(){
    if( this.meal.img ) {
      const ref = this.storage.ref( this.meal.img );
      this.mealImage$ = ref.getDownloadURL();
    }
  }

  constructor(
    public dialog: MatDialog,
    private storage: AngularFireStorage
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: this.meal.tags
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
