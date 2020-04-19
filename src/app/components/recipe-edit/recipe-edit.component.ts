import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealService } from 'src/app/shared/services/food.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Meal } from 'src/app/shared/models/meal.model';
import { FileService } from 'src/app/shared/services/file.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  confirmation$ = new BehaviorSubject(null);
  id: string;
  meal$ = new BehaviorSubject<Meal>(null);
  updatedMeal: Meal = {
    timestamp: 0
  }
  mealImage$: Observable<string | null>;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private mealsService: MealService,
    private fileService: FileService
    ) { }

  ngOnInit() {
    this.setParams();
    this.getEditedMeal();
    this.editForm = new FormGroup({
      'name': new FormControl(),
      'category': new FormControl(),
      'tags': new FormControl(),
    })
  }

  setParams() {
    this.route.params
    .subscribe( (params: Params) => {
        this.id = params['id']
        this.updatedMeal.id = this.id;
      }      
    )
  }

  getEditedMeal() {
    this.mealsService.getTheMeal(this.id)
      .subscribe( meal => {
        this.meal$.next(meal)
        if( meal.img ) {
          this.mealImage$ = this.fileService.getImage(meal.img);
          this.updatedMeal.img = meal.img;
        }
        this.initializeForm(meal)
      });
  }

  initializeForm(meal: Meal) {
    this.editForm.controls.name.setValue(meal.name)
    this.editForm.controls.category.setValue(meal.category)
    this.editForm.controls.tags.setValue(meal.tags)
  }

  onUpdateRecipe() {
    this.updatedMeal.name = this.editForm.value.name;
    this.updatedMeal.category = this.editForm.value.category;
    this.updatedMeal.tags = this.editForm.value.tags;
    this.updatedMeal.timestamp = Date.now();
    
    return this.mealsService.updateItem(this.updatedMeal);
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result) {
          this.mealsService.deleteItem(this.id);
          this.fileService.deleteItem(this.updatedMeal.img);
        }
      }
    });
  }

}
