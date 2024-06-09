import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {elementAt} from "rxjs";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  offset =0;
  pokemon: any[] = [];
  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  poke: any;
  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon()
  }

  // @ts-ignore
  loadPokemon(loadMore=false, event?){
    if (loadMore){
      this.offset += 25;
    }
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log('result: ', res);
        this.pokemon = [...this.pokemon, ...res];

        if (event){
          event.target.complete();
        }

        if (this.offset == 125){
          this.infinite.disabled = true;
        }
    } )
  }

  onSearchChange(e: any){
    let value = e.detail.value

    if (value == ''){
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }
}
