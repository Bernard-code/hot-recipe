import { Component, OnInit } from '@angular/core';
import { MealService } from '../../shared/services/food.service';
import { Meal } from '../../shared/models/meal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: Meal[];
  constructor(
    private mealsService: MealService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mealsService.getAllMeals()
      .subscribe( value => {
        this.meals = value;
      })
  }
  
  onClickRecipe(id: number) {
    this.router.navigate(['recipe-view', id]);
  }

}
