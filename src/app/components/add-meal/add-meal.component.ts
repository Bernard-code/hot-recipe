import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Meal } from '../../shared/models/meal.model';
import { BehaviorSubject, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MealService } from '../../shared/services/food.service';
import { FileService } from 'src/app/shared/services/file.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  mealForm: FormGroup;
  useCamera = false;
  uploadedFile: File;
  uploadPercent$ = new BehaviorSubject<number>(null);
  downloadURL = new BehaviorSubject<any>(null);
  meal: Meal;

  constructor(
    private mealService: MealService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  capitalizeFirstLetter(string) {
    if( string !== null ) {
      return string.charAt(0).toUpperCase() + string.slice(1);      
    }
  }

  onHandleImageEmit(img) {
    img = this.fileService.b64toBlobToFile(img.imageAsDataUrl, img._mimeType);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.downloadURL.next(e.target.result);
      this.uploadedFile = img;
      this.useCamera = false; 
    }
    reader.readAsDataURL(img);
  }

  onFileSelect(file) {
    this.downloadURL.next(file.target.files[0]);    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.downloadURL.next(e.target.result);
      this.uploadedFile = file.target.files[0];
    }
    reader.readAsDataURL(file.target.files[0]);
  }
  
  onFileCapture() {
    this.useCamera = !this.useCamera;
  }

  initializeForm() {
    this.mealForm = new FormGroup({
      'name': new FormControl(''),
      'makingTime': new FormControl(''),
      'category': new FormControl(''),
      'steps': new FormControl([]),
      'ingredients': new FormControl([]),
      'tags': new FormControl([]),
      'description': new FormControl('')
    })
  }
  
  onAddIngr(ingredients) {
    this.mealForm.value.ingredients = ingredients;
  }
  
  onAddStep(steps) {
    this.mealForm.value.steps = steps;
  }
  
  onAddSTag(tags) {
    this.mealForm.value.tags = tags;
  }

  onSubmit() {    
    this.meal = {
      timestamp: Date.now(),
      name: this.capitalizeFirstLetter(this.mealForm.value.name),
      makingTime: this.capitalizeFirstLetter(this.mealForm.value.makingTime),
      category: this.capitalizeFirstLetter(this.mealForm.value.category),
      ingredients: this.mealForm.value.ingredients,
      steps: this.mealForm.value.steps,
      tags: this.mealForm.value.tags,
      description: this.capitalizeFirstLetter(this.mealForm.value.description),
    }
    
    console.log(this.meal);

    if (this.uploadedFile) {
      const fileUploading = this.fileService.onFileUpload(this.uploadedFile);
      this.meal.img = fileUploading.filePath;    
      
      fileUploading.imgPercent$.subscribe( percent => {
        this.uploadPercent$.next(percent);
      })
      
      fileUploading.task$
      .pipe(
        finalize(() => this.mealService.addMeal(this.meal) )
      )
      .subscribe(res => {
      });
    } else {
      this.mealService.addMeal(this.meal);
    }
    
  }

}
