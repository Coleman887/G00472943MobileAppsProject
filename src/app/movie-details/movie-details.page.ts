import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http';
import { DataService } from '../services/data';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, heart, home } from 'ionicons/icons';
import { ViewWillEnter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonCard, IonIcon, IonCardContent, CommonModule, FormsModule]
})
export class MovieDetailsPage implements ViewWillEnter {

  cast: any[] = [];
  crew: any[] = [];

  constructor(public router : Router, private myhttp: MyHttpService, public data: DataService) { 
      addIcons({ heart, home, arrowBack })
  }

// Orginally had this functionality set in ngOnInit, but because that was only loading this once at the start of the application, it broke functionality
// if the user navigated back to it from another page. ionViewWillEnter will run each time the page is loaded, not just the first time.
  ionViewWillEnter() {
    let id = this.data.selectedMovieId;
    this.getMovieCredits(id);
  }
// Fills the cast and crew arrays defined above with the results of the myhttpservice API call within its getMovieCredits method.
  getMovieCredits(id: number) {
    this.myhttp.getMovieCredits(id).subscribe((data: any) => {
        this.cast = data.cast;
        this.crew = data.crew;
    });
  }

  // This is used when the add to favourites button is clicked, adding the selected movie's id, title, overview and cover image to the favouritesList.
  addToFavouritesButton() {
    let movie = { id: this.data.selectedMovieId,
                  title: this.data.selectedMovieTitle,
                  overview: this.data.selectedMovieOverview,
                  poster_path: this.data.selectedMoviePoster
  }
  this.data.addFavourite(movie);
    }

// Just the opposite of the above, removes the movie's id from the favouritesList. 
// Only needs the movie's id to remove from the favourites list so removed the other variables.
  removeFromFavouritesButton() {
    let movie = { 
      id: this.data.selectedMovieId,
    }
    this.data.removeFavourite(movie);
  }

  // Stores the person's id in DataService and navigates to their details page.
  storePersonId(person: any) {
    this.data.selectedPersonId = person.id;
    this.router.navigate(['details']);
  }
  }
  


