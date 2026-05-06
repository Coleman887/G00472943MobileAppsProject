import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DataService } from './services/data';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private data: DataService) {

  }


// Loads the favourites list using Ionic Storage at the beginning of the application. 
ngOnInit() {
  this.data.storedFavourites();
}

}
