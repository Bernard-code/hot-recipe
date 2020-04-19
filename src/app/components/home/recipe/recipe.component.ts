import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../shared/models/meal.model';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  @Input() meal:Meal;
  mealImage$: Observable<string | null>;

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(){
    if( this.meal.img ) {
      this.mealImage$ = this.fileService.getImage(this.meal.img);
    }
  }

}
