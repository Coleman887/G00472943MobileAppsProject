import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root',
})
export class DataService {

  // Importing Storage and initialising it in the constructor
  constructor(private storage: Storage) {
    this.init();
  }
// Creates an instance of the storage
  async init() {
    this.storage = await this.storage.create();
  }

// These are the properties used to share needed data across the pages of the application
  selectedMovieTitle: string = "";
  selectedMovieId: number = 0;
  selectedPersonId: number = 0;
  favouritesList: any[] = [];
  selectedMovieOverview: string = "";
  selectedMoviePoster: string = "";

// This method will 'push' the selected movie to the favouritesList array and save it to storage.
async addFavourite(movie: any) { 
    this.favouritesList.push(movie);
    await this.storage.set('favourites', this.favouritesList);
  }

// Using this method to cleanly loop through the favouritesList array, and filters the array keeping the movies that don't match the id.
async removeFavourite(movie: any) { 
    this.favouritesList = this.favouritesList.filter(item => item.id !== movie.id); 
    await this.storage.set('favourites', this.favouritesList);
  }

// Method with regular for loop, returning a boolean value depending on if the movie in the favouritesList at the [i]th element matches the movie currenty being displayed.
    isFavourite(movieId: number) {
    for (let i = 0; i < this.favouritesList.length; i++) {
      if (this.favouritesList[i].id == movieId) {
          return true;
      }
    }
    return false;
  }

// Method used to load the favourites from storage at the beginning of the application. Initially caused the program to fail to load anything, but after adding the null check
// it's working as intended.
  async storedFavourites() {
    let stored = await this.storage.get('favourites');
    if (stored != null) {
      this.favouritesList = stored;
    }
  }
}










