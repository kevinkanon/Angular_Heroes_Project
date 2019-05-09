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

    constructor(private heroService: HeroService) { }

    ngOnInit() { this.getHeroes(); }

    getHeroes(): void 
    {
        this.heroService.getHeroesFromService()
                        .subscribe(heroesFromService => this.heroes = heroesFromService);
    }

    /**
     * When the given name is non-blank, the handler creates a Hero-like object from the name (it's only missing the id) and passes it to the services addHero() method.
     * @param name 
     */
    add(name: string): void {
        name = name.trim();

        if (!name) { return; }
        this.heroService.addHeroFromService({ name } as Hero)
                        .subscribe(hero => {
                            this.heroes.push(hero);
                        });
    }

    delete(heroToDelete: Hero): void {
        this.heroes = this.heroes.filter(h => h !== heroToDelete);
        this.heroService.deleteHeroFromService(heroToDelete).subscribe();
    }

}
