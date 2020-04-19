import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { v1 as uuidv1 } from 'uuid';
import { Meal } from '../../shared/models/meal.model';
import { NgForm } from '@angular/forms';
import { MealService } from '../../shared/services/food.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CaptureImgComponent } from './capture-img/capture-img.component';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  @ViewChild('addForm', {'static': false})
  form: NgForm;
  useCamera = false;
  // file: File = null;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
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
    private mealService: MealService
  ) { }

  ngOnInit() {
  }

  onFileSelect(e) {
    // this.file = e.target.files[0];
    this.onFileUpload( e.target.files[0] );
  }
  onFileCapture(){
    this.useCamera = !this.useCamera;
  }
  onFileUpload(file) {
    // const file = file;
    const newId = uuidv1();
    const filePath = 'meal_' + newId;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.meal.img = filePath;
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
    .subscribe(res => {
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    b64Data = b64Data.split('base64,')[1];
    b64Data = b64Data.replace(/\s/g, '');
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  onHandleImageEmit(img) {
    this.onFileUpload( this.b64toBlob(img.imageAsDataUrl, img._mimeType) );
  }
  onSubmit(form) {
    this.meal.timestamp = Date.now();
    this.meal.name = this.capitalizeFirstLetter(this.form.value.name)
    this.meal.name = this.capitalizeFirstLetter(this.form.value.name);
    this.meal.category = this.capitalizeFirstLetter(this.form.value.category);
    this.meal.tags = this.form.value.tags.split(',');
    this.meal.makingTime = this.capitalizeFirstLetter(this.form.value.makingTime);
    console.log(this.meal)
    this.mealService.addMeal(this.meal)
  }

}
