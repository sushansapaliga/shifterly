import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument }  from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  bookingCollection : AngularFirestoreCollection<Item>;
  bookings :Observable<Item[]>;

  constructor(public afs : AngularFirestore) {

    this.bookings =  this.afs.collection('/sushan').valueChanges();
   }
}

interface Item{
  id?:string;
  title?:string;
  desp?:string;
}
