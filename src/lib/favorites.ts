import { Character } from "./types";

let myFavorites: Character[] = [];

export function getFavorites(): Character[] {
  return myFavorites;
}

export function addFavorite(character: Character): Character[] {
  const exists = myFavorites.some((fav) => fav.id === character.id);
  if (!exists) {
    myFavorites.push(character);
  }
  return myFavorites;
}

export function removeFavorite(id: number): Character[] {
  myFavorites = myFavorites.filter((character) => character.id !== id);
  return myFavorites;
}
