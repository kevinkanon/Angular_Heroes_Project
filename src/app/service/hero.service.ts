import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../data/hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from '../service/message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class HeroService {

    private heroesUrl = 'api/heroes';  // URL to web api
    

    constructor(private http: HttpClient, private messageService: MessageService) 
    { 

    }

    /**
     * Log a HeroService message with the MessageService
     * @param message 
     */
    private log(message: string) 
    {
        this.messageService.add(`HeroService: ${message}`);
    }

    /**
     * GET heroes list from the server
     * tap operator of rxjs looks at the observable values, does something with those values, and passes them along. The tap call back doesn't touch the values themselves.
     */
    getHeroesFromService(): Observable<Hero[]> 
    {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError<Hero[]>('getHeroesFromService', []))
            );
    }

    /**
     * GET hero by id. Will 404 if id not found
     * @param id 
     */
    getOneHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url)
                        .pipe(
                            tap(_ => this.log(`fetched hero id=${id}`)),
                            catchError(this.handleError<Hero>(`getOneHero id=${id}`))
                        );
    }

    /**
     * PUT: update the hero on the server
     * @param heroFromComponentToUpdate 
     */
    updateHero(heroFromComponentToUpdate: Hero): Observable<any> 
    {
        return this.http.put(this.heroesUrl, heroFromComponentToUpdate, httpOptions)
                        .pipe(
                            tap(_ => this.log(`updated hero id=${heroFromComponentToUpdate.id}`)),
                            catchError(this.handleError<any>('updateHero'))
                        );
    }

    /**
     * POST: add a new hero to the server
     * @param heroFromComponentToAdd 
     */
    addHeroFromService (heroFromComponentToAdd: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, heroFromComponentToAdd, httpOptions)
                        .pipe(
                            tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
                            catchError(this.handleError<Hero>('addHeroFromService'))
                        );
    }

    /**
     * DELETE: delete the hero from the server
     * @param heroFromComponentToDelete 
     */
    deleteHeroFromService (heroFromComponentToDelete: Hero | number): Observable<Hero> 
    {
        const id = (typeof heroFromComponentToDelete === 'number') ? heroFromComponentToDelete : heroFromComponentToDelete.id;
        const url = `${this.heroesUrl}/${id}`;
      
        return this.http.delete<Hero>(url, httpOptions)
                        .pipe(
                            tap(_ => this.log(`deleted hero id=${id}`)),
                            catchError(this.handleError<Hero>('deleteHeroFromService'))
                        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) 
    {
        return (error: any): Observable<T> => 
        {
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
       
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
       
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }


}
