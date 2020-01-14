import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument }  from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { faCheckCircle,faTimesCircle,faSpinner,faSignOutAlt,faHome,faTruck,faHistory } from '@fortawesome/free-solid-svg-icons';
import { ConnectionService } from 'ng-connection-service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  faCheckCircle= faCheckCircle;
  faTimesCircle= faTimesCircle;
  faSpinner=faSpinner;
  faSignOutAlt=faSignOutAlt;
  faHome=faHome;
  faTruck = faTruck;
  faHistory = faHistory;


  title = 'shifterly';
  mode=0 ;
  bookingCollection : AngularFirestoreCollection<Item>;
  bookings :Observable<Item[]>;
  items: Item[];
  itemDoc:any ;

  prev=0;
  isConnected = true;
  bookcol;

  constructor(public afs : AngularFirestore, private connectionService: ConnectionService){
    //this.bookings =  this.afs.collection('/bookings').valueChanges();
    this.bookcol=this.afs.collection('/bookings',ref =>ref.orderBy('date','asc'));
    this.bookings=   this.afs.collection('/bookings',ref =>ref.orderBy('date','asc')).snapshotChanges().pipe(map(changes=>{
      return changes.map(a=>{
        const data= a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    }));


    this.bookings.subscribe(items=>{
      //console.log(items);
      try{
      this.items = items;
      if(items.length==0)
        this.mode=0;
      else
        this.mode=1;
      }
      catch{
        this.mode=0;
      }
    })

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.mode=this.prev;
      }
      else {
        this.prev=this.mode;
        this.mode=0;
      }
    })


  }

  change_mode(inp1){
    if(inp1 =="home" && this.mode != 0){
      this.mode=1;
    }
    else if(inp1 =="del" && this.mode != 0){
      this.mode=2;
    }
    else if(inp1 == "his" && this.mode != 0){
      this.mode = 3;
    }
  }


  updateBook(event,items,status){
    this.updateItem(items,status);
  }

  updateItem(items,status1){
    this.prev=this.mode;
    console.log(items.id);
    this.afs.collection('bookings').doc(items.id).update({
      status:status1
    })
    this.mode=this.prev;
  }
}

interface Item{
  id?: string;
  booktime?: string;
  cost?: string;
  date?: string;
  dest?: string;
  goods?: string;
  owner?: string;
  phone?: string;
  src?: string;
  status?: string;
  vehicle?: string;
}
