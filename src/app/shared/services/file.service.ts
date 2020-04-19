import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { v1 as uuidv1 } from 'uuid';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  getImage(id) {
    return this.storage.ref( id ).getDownloadURL();
  }

  onFileUpload(file) {
    const newId = uuidv1();
    const filePath = 'meal_' + newId;
    const task = this.storage.upload(filePath, file);
    return {
      task$: task.snapshotChanges(),
      filePath: filePath,
      imgPercent$: task.percentageChanges()
    } 
  }

  b64toBlobToFile(b64Data, contentType, sliceSize?) {
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
    let finalFile = new File([blob], 'file')
    return <File>finalFile;
  }
  
  deleteItem(id: string) {
    const deletedFile = this.storage.ref( id ).delete();
  }
}
