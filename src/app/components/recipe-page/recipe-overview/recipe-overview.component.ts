import { Component, OnInit, Input } from '@angular/core';
import { Meal } from 'src/app/shared/models/meal.model';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {
  @Input() meal: Meal;
  mealImage$: Observable<string | null>;

  constructor(
    private fileService: FileService
  ) {}
  ngOnInit() {
    if( this.meal.img ) {
      this.mealImage$ = this.fileService.getImage(this.meal.img);
    }
  }
}
