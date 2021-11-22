import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService, PokeResponse, stats } from '../app.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  initialPokemons:string[] = ['moltres', 'articuno', 'zapdos']
  loading = false;
  pokemonsData:any
  pokemonsArray:any[]=[];
  status = false;
  inputForm:any = '';
  gameForm:any = '';

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      pokeName:['', [Validators.required]],
    })
    this.gameForm = this.fb.group({
      chosenAttribute:['']
    })
    this.initialPokemons.forEach((pokemon)=>{
      this.makePokeRequest(pokemon)
    })
  }

  addPokemon() {
    if (this.inputForm.value.pokeName && this.inputForm.value.pokeName.replaceAll(' ','') !== '') {
      let poke = this.inputForm.value.pokeName.toLowerCase(); 
      this.makePokeRequest(poke)
    }
    this.inputForm.reset()
  }

  pokemonAttribute = (value:stats) => {
    if (!value.stat.name.includes('-')) return {prop: value.stat.name, value: value.base_stat};
    return null
  }

  makePokeRequest(poke:string) {
    this.loading = true;
    this.appService.getPoke(poke).subscribe({
      next: (response:PokeResponse) => {
        this.pokemonsData = response.stats.reduce((acc:{[k: string]: any}, value:stats) => {
          const property = this.pokemonAttribute(value)
          property ? acc[property.prop] = property.value : {...acc}
          return acc
        },{}) 
        this.pokemonsData.type = response.types[0].type.name
        this.pokemonsData.image = response.sprites.other["official-artwork"].front_default
        this.pokemonsData.loser = false;
        this.pokemonsData.name = response.name;
        this.pokemonsArray.push(this.pokemonsData)
        this.loading = false;
      },
      error: (error) => {
        error.error.status == 'error' ? this.status = false: this.status = true;
        this.loading = false;
        }
      });
  }

  resetGame() {
    this.pokemonsArray.filter((value)=>{
      value.loser = false
    })
  }

  gameOver() {
    this.resetGame()

    const max = this.pokemonsArray.reduce((acc, value) => {
      let contest = value[this.gameForm.value.chosenAttribute]
      return (acc <= contest) ? acc = contest : acc = acc 
    },0)

    this.pokemonsArray.map((value)=>{
      value[this.gameForm.value.chosenAttribute] < max ? value.loser = true : value.loser = false
    })
  }
  
  removePokemon(value:any){
    let pokemonIndex = this.pokemonsArray.findIndex((element:any)=>{
      return element == value
    })

    this.pokemonsArray.splice(pokemonIndex,1)
  }
}
