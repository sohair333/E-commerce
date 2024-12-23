import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userObject: any = {};

  constructor(private db: AngularFireDatabase, private datePipe: DatePipe) {
    this.userObject = {
      addToCart: '0',
      checkOut: '0',
      online: 1,
      platformType: 'WEB_DESKTOP', // should be enum model
      productView: '0',
      purchase: '0',
      updatedDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      userId: localStorage.getItem('uniqueId'),
      userIsLogin: localStorage.getItem('AccessToken') ? '1' : '0',
    };
  }

  generateUniqueId() {
    let randomeNumber = Math.floor(Math.random() * 1000000);
    let uniqueId = randomeNumber + '' + Date.now();
    localStorage.setItem('uniqueId', uniqueId);
  }

  getUserData() {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('users/' + localStorage.getItem('uniqueId'))
        .on('value', (snapshot) => {
          resolve(snapshot.val());
        });
    });
  }

  setUSerData(object: any) {
    this.db.database
      .ref('users/' + localStorage.getItem('uniqueId'))
      .update(object);
  }
}
