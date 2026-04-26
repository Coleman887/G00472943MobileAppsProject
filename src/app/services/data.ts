import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  selectedMovieId: number = 0;
  selectedPersonId: number = 0;
  favouritesList: any[] = [];

// This method will 'push' the selected movie to the favouritesList array.
addFavourite(movie: any) { 
    this.favouritesList.push(movie);
  }

// Using this method to cleanly loop through the favouritesList array, and filters the array keeping the movies that don't match the id.
removeFavourite(movie: any) { 
    this.favouritesList = this.favouritesList.filter(item => item.id !== movie.id); 
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
}










