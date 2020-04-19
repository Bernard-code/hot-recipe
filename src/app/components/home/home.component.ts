import { Component, OnInit } from '@angular/core';
import { MealService } from '../../shared/services/food.service';
import { Meal } from '../../shared/models/meal.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: Meal[];
  constructor(
    private mealsService: MealService
  ) { }

  ngOnInit() {
    this.mealsService.getMeals()
      .subscribe( value => {
        this.meals = value;
      })
  }

}
