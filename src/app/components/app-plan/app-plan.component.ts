import { Component } from '@angular/core';

@Component({
  selector:'app-app-plan',
  templateUrl: './app-plan.component.html'
})
export class AppPlanComponent {
  plan = [
    'recipe page',
    'recipe edit',
    'cam access',
    'first deploy for mobile',
    'select by tags/category',
    'add calories',
    'compose day plan of eating',
    'delete recipe -> snack bar notification',
    'images stored on device - service workers',
    'webcam style on mobile',
  ]
}
