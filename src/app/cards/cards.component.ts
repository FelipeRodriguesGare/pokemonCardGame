import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() pokeData:any;
  @Output() pokemonToRemove: EventEmitter<string> = new EventEmitter();
  @Input() loading = false;

  constructor() { }
  
  ngOnInit(): void {
  }
  
  isLoser(){
    if (this.pokeData.loser) return true;
    return false
  }

  removePokemon() {
    console.log(this.pokeData)
    this.pokemonToRemove.emit(this.pokeData)
  }

}
