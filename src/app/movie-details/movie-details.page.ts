import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http';
import { DataService } from '../services/data';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home, logoApple, settingsSharp, star } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonCard, IonIcon, IonCardContent, CommonModule, FormsModule]
})
export class MovieDetailsPage implements OnInit {

  cast: any[] = [];
  crew: any[] = [];

  constructor(public router : Router, private myhttp: MyHttpService, public data: DataService) { 
      addIcons({ heart, home, logoApple, settingsSharp, star })
  }

  ngOnInit() {
    let id = this.data.selectedMovieId;
    this.getMovieCredits(id);
  }

  getMovieCredits(id: number) {
    this.myhttp.getMovieCredits(id).subscribe((data: any) => {
        this.cast = data.cast;
        this.crew = data.crew;
    });
  }


}
