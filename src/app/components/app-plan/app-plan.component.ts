import { Component } from '@angular/core';

@Component({
  selector:'app-app-plan',
  templateUrl: './app-plan.component.html'
})
export class AppPlanComponent {
  plan = [
    'cam access',
    'add meal services',
    'recipe list layout',
    'recipe page',
    'recipe edit/delete',
    'select by tags/category',
    'add calories',
    'compose day plan of eating',
    'first deploy for mobile'
  ]
}
