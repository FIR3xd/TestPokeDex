import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import  {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export  class PokemonService{
  baseUrl= 'https://pokeapi.co/api/v2/\n'
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  constructor(private http: HttpClient) {

  }
  getPokemon(offset =0){
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      map(result => {
        // @ts-ignore
        return result['results']
      }),
      map(pokemons =>{
        // @ts-ignore
        return pokemons.map((poke, index) => {

          poke.image = this.getPokeImage(index + offset + 1);
          poke.pokeIndex = offset + index +1;
          return poke;
        });
      })
    )
  }

  // @ts-ignore
  getPokeImage(index){
    return `${this.imageUrl}${index}.png`;
  }

  findPokemon(search :any){
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map(pokemon => {
        // @ts-ignore
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        // @ts-ignore
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }

  getPokeDetails(index: any) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        // @ts-ignore
        let sprites = Object.keys(poke['sprites']);
        // @ts-ignore
        poke['images'] = sprites
          // @ts-ignore
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }

}
