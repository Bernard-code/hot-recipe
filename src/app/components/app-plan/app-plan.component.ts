import { Component } from '@angular/core';

@Component({
  selector:'app-app-plan',
  templateUrl: './app-plan.component.html'
})
export class AppPlanComponent {
  plan = [
    'delete recipe -> snack bar error ??',
    'ordered list look like chips ??',
    'add cool font with weights: 200, 400, 500, 600, 700, 900',
    'ocena przepisu/ulubione',
    'robione/nie robione',
    'jakis lepszy fajny design',

    'compose day of eating',
    'days of eating library',
    'count calories of day of eating',

    'cook step by step',
    'ingredients directions tabs',

    'compose day plan of eating',
    'add calories',
    'generate shopping list',
    'select by tags/category',
    
    'cam access',
    'images stored on device - service workers',
    'webcam style on mobile',
    'recipe page',
    'additional recipe fields'
  ]
}
