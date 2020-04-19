import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Meal } from '../../shared/models/meal.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MealService } from '../../shared/services/food.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  @ViewChild('addForm', {'static': false})
  form: NgForm;
  useCamera = false;
  uploadedFile: File;
  uploadPercent$ = new BehaviorSubject<number>(null);
  downloadURL = new BehaviorSubject<any>(null);
  meal: Meal = {
    name: '',
    img: '',
    category: '',
    tags: [],
    makingTime: '',
    timestamp: 0
  };

  constructor(
    private storage: AngularFireStorage,
    private mealService: MealService,
    private fileService: FileService
  ) { }

  ngOnInit() {
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  onSubmit(form) {
    this.meal.timestamp = Date.now();
    this.meal.name = this.capitalizeFirstLetter(this.form.value.name)
    this.meal.category = this.capitalizeFirstLetter(this.form.value.category);
    this.meal.tags = this.form.value.tags.split(',');
    this.meal.makingTime = this.capitalizeFirstLetter(this.form.value.makingTime);
    
    const fileUploading = this.fileService.onFileUpload(this.uploadedFile)
    this.meal.img = fileUploading.filePath;
    
    console.log(this.meal)
    
    fileUploading.imgPercent$.subscribe( percent => {
      this.uploadPercent$.next(percent);
    })
    
    fileUploading.task$
    .pipe(
      finalize(() => this.mealService.addMeal(this.meal) )
    )
    .subscribe(res => {
    });
    
  }

}
