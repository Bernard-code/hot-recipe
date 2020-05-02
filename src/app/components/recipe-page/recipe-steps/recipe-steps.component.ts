import { Component, OnInit, Input } from '@angular/core';
import { Meal } from 'src/app/shared/models/meal.model';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './recipe-steps.component.html',
  styleUrls: ['./recipe-steps.component.scss']
})
export class RecipeStepsComponent implements OnInit {
  @Input() meal: Meal;

  constructor() { }

  ngOnInit() {
  }

}
