import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PokeResponse {
  stats:stats[],
  sprites:{
    other:{
      'official-artwork':{
        front_default:string
      }
    }
  },
  types:[{
    type:{
      name:string
    }
  }],
  name:string
}

export interface stats {
  base_stat:number,
  effort:number,
  stat:{
    name:string,
    url:string,
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  url:string = ''

  getPoke(poke:string) {
    this.url = `https://pokeapi.co/api/v2/pokemon/${poke}`
    return this.http.get<PokeResponse>(this.url)
  }
}
