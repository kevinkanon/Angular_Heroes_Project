import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    heroes: Hero[] = [];
    
    constructor(private heroService: HeroService) { }
    
    ngOnInit() { this.getHeroes(); }
    
    getHeroes(): void 
    {
        this.heroService.getHeroesFromService()
                        .subscribe(heroesFromService => this.heroes = heroesFromService.slice(1, 5));
    }

}
