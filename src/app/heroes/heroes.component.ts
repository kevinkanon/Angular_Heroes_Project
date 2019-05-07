import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

    heroes: Hero[];
    selectedHero: Hero;

    constructor(private heroService: HeroService) { }

    ngOnInit() { this.getHeroes(); }

    getHeroes(): void 
    {
        this.heroService.getHeroesFromService()
                        .subscribe(heroesFromService => this.heroes = heroesFromService);
    }

    /*getHeroes(): void  { this.heroes = this.heroService.getHeroesFromService();  }*/

    onSelect(hero: Hero): void  { this.selectedHero = hero; }

}
