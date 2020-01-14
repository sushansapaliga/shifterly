import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule }  from '@angular/fire/database';
import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { BookService } from './service/book.service';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase,'angularfs'),
    AngularFirestoreModule,
    FontAwesomeModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
