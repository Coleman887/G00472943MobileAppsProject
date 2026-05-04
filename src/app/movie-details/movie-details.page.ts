import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http';
import { DataService } from '../services/data';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home, logoApple, settingsSharp, star } from 'ionicons/icons';
import { ViewWillEnter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonCard, IonIcon, IonCardContent, CommonModule, FormsModule]
})
export class MovieDetailsPage implements OnInit, ViewWillEnter {

  cast: any[] = [];
  crew: any[] = [];
  movie: any = {id: this.data.selectedMovieId,
                title: this.data.selectedMovieTitle,
                poster_path: this.data.selectedMoviePoster
  }

  constructor(public router : Router, private myhttp: MyHttpService, public data: DataService) { 
      addIcons({ heart, home, logoApple, settingsSharp, star })
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    let id = this.data.selectedMovieId;
    this.getMovieCredits(id);
  }

  getMovieCredits(id: number) {
    this.myhttp.getMovieCredits(id).subscribe((data: any) => {
        this.cast = data.cast;
        this.crew = data.crew;
    });
  }

  // This is used when the add to favourites button is clicked, adding
  addToFavouritesButton() {
    let movie = { id: this.data.selectedMovieId,
                  title: this.data.selectedMovieTitle,
                  overview: this.data.selectedMovieOverview,
                  poster_path: this.data.selectedMoviePoster
  }
  this.data.addFavourite(movie);
    }

  removeFromFavouritesButton() {
    let movie = { id: this.data.selectedMovieId,
                  title: this.data.selectedMovieTitle,
                  poster_path: this.data.selectedMoviePoster
    }
    this.data.removeFavourite(movie);
  }

  storePersonId(person: any) {
    this.data.selectedPersonId = person.id;
    this.router.navigate(['details']);
  }
  }
  


