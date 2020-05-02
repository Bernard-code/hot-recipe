import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealService } from 'src/app/shared/services/food.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Meal } from 'src/app/shared/models/meal.model';
import { FileService } from 'src/app/shared/services/file.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    name: '', 
    timestamp: 0
  };
  mealImage$: Observable<string | null>;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private mealsService: MealService,
    private fileService: FileService
    ) { }

  ngOnInit() {
    this.initializeForm();
    this.setParams();
  }

  initializeForm() {
    this.editForm = new FormGroup({
      'name': new FormControl(),
      'category': new FormControl(),
      'tags': new FormControl([]),
      'ingredients': new FormControl([]),
      'makingTime': new FormControl(),
      'description': new FormControl(),
      'steps': new FormControl([]),
    })
  }

  setParams() {
    this.route.params
    .subscribe( (params: Params) => {
        this.id = params['id']
        this.getEditedMeal();
      }      
    )
  }

  getEditedMeal() {
    this.mealsService.getTheMeal(this.id)
      .subscribe( meal => {
        this.meal$.next(meal)
        this.updatedMeal = meal;
        if( meal.img ) {
          this.mealImage$ = this.fileService.getImage(meal.img);
        }
        this.udpateForm(meal)
      });
  }

  udpateForm(meal: Meal) {
    this.editForm.controls.name.setValue(meal.name);
    this.editForm.controls.category.setValue(meal.category);
    this.editForm.controls.makingTime.setValue(meal.makingTime);
    this.editForm.controls.description.setValue(meal.description);
    this.editForm.controls.steps.setValue(meal.steps);
    this.editForm.controls.ingredients.setValue(meal.ingredients);
    this.editForm.controls.tags.setValue(meal.tags);
    this.updatedMeal.timestamp = meal.timestamp;
  }

  onUpdateRecipe() {
    this.updatedMeal = {
      name: this.editForm.value.name,
      category: this.editForm.value.category,
      makingTime: this.editForm.value.makingTime,
      ingredients: this.editForm.value.ingredients,
      steps: this.editForm.value.steps,
      tags: this.editForm.value.tags,
      description: this.editForm.value.description,
      timestamp: this.updatedMeal.timestamp,
      id: this.id
    } 
    return this.mealsService.updateItem(this.updatedMeal);
  }
  
  onAddIngr(ingredients) {
    this.editForm.value.ingredients = ingredients;
  }
  
  onAddStep(steps) {
    this.editForm.value.steps = steps;
  }
  
  onAddSTag(tags) {
    this.editForm.value.tags = tags;
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
  check(x){
    console.log(x)
    if (x === 'steps'){
      console.log(this.updatedMeal.steps)
    }
    if (x === 'form'){
      console.log(this.updatedMeal)
    }
    if (x === 'ingrs') {
      console.log(this.updatedMeal.ingredients)
    }
  }

}
