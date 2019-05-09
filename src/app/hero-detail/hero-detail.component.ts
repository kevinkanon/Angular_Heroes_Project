import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../service/hero.service';
import { Hero } from '../data/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

    hero: Hero;

    
    /**
     * 
     * @param route => The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. || the parameters extracted from the URL. The "id" parameter is the id of the hero to display.
     * @param heroService =>  gets hero data from the remote server 
     * @param location => The location is an Angular service for interacting with the browser. 
     */
    constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) 
    { 

    }

    ngOnInit(): void { this.getHero(); }

    /**
     * Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be. || const id = +this.route.snapshot.paramMap.get('id');
     */
    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');

        this.heroService.getOneHero(id)
                        .subscribe(heroFromService => this.hero = heroFromService);
    }

    goBack(): void { this.location.back(); }

    save(): void 
    {
        this.heroService.updateHero(this.hero)
                        .subscribe(() => this.goBack());
    }

}
