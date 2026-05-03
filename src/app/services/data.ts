import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
  }

  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  selectedMovieTitle: string = "";
  selectedMovieId: number = 0;
  selectedPersonId: number = 0;
  favouritesList: any[] = [];
  selectedMovieOverview: string = "";
  selectedMoviePoster: string = "";

// This method will 'push' the selected movie to the favouritesList array.
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

  async storedFavourites() {
    this.favouritesList = await this.storage.get('favourites');
  }
}










