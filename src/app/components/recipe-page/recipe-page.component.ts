import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/shared/services/food.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Meal } from 'src/app/shared/models/meal.model';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {
  confirmation$ = new BehaviorSubject(null);
  id: string;
  meal$ = new BehaviorSubject<Meal>(null);
  mealImage$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealService,
    private fileService: FileService
    ) { }

  ngOnInit() {
    this.getParams();
    this.getEditedMeal();
  }

  getParams() {
    this.route.params
    .subscribe( (params: Params) => {
        this.id = params['id']
      }      
    )
  }

  getEditedMeal() {
    this.mealsService.getTheMeal(this.id)
      .subscribe( meal => {
        this.meal$.next(meal)

        if( meal.img ) {
          this.mealImage$ = this.fileService.getImage(meal.img);
        }
      });
  }

}
