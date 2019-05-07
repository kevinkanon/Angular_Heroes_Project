import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from '../data/hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from '../service/message.service';

@Injectable({ providedIn: 'root' })

export class HeroService {

    constructor(private messageService: MessageService) { }

    /*  getHeroesFromService(): Hero[] { return HEROES; } */

    getHeroesFromService(): Observable<Hero[]> 
    {
        // TODO: send the message _after_ fetching the heroes
        this.messageService.add('HeroService: fetched heroes');
        return of(HEROES);
    }


}
