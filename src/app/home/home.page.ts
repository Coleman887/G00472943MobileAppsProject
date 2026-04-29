import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardContent, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data';
import { MyHttpService } from '../services/my-http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, logoApple, settingsSharp, star } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonCard, IonCardContent, IonIcon, FormsModule, CommonModule, IonInput],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  key: string = "";

  constructor(public router : Router, private myhttp: MyHttpService, public data: DataService) {
addIcons({ heart, logoApple, settingsSharp, star });
  }


  // This is how the results from the myHttpService call gets stored, into the previously empty array movies defined above.
  getTrending() {
    this.myhttp.getTrending().subscribe((data: any) => {
      this.movies = data.results;
  });
}

searchMovies() {
  this.myhttp.searchMovies(this.key).subscribe((data: any) => {
    this.movies = data.results;
  })
}
  // Implementing this method from the OnInit interface to run the getTrending method as soon as the page begins loading.
  ngOnInit() {
    this.getTrending();
}

}
