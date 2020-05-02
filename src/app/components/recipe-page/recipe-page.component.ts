import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/shared/services/food.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Meal } from 'src/app/shared/models/meal.model';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {
  id: string;
  meal$ = new BehaviorSubject<Meal>(null);

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealService
    ) { }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.route.params
    .subscribe( (params: Params) => {
        this.id = params['id']
        this.getMeal();
      }      
    )
  }

  getMeal() {
    this.mealsService.getTheMeal(this.id)
      .subscribe( meal => {
        this.meal$.next(meal)
      });
  }
}
