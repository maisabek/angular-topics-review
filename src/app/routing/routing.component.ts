import { Component, OnInit } from '@angular/core';
import {product} from '../models/product';
import {ActivatedRoute, Router,NavigationStart, Event as NavigationEvent} from '@angular/router';
import {Location} from '@angular/common';
import { filter } from 'rxjs/operators';
// '@angular/router'
// دى عبارة عن باكتج انجلر بتقدمها او خدمة
@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss']
})
export class RoutingComponent implements OnInit {
  products: product[];
  // location:Location دى سرفيس جاهزة
  constructor(public activeRoute: ActivatedRoute,private router: Router,private location: Location) {
    this.products = [];
    Array(5).fill('').map((_, i) => {
    this.products.push(new product(i, `mobile ${i + 1}`));
     });
    console.log(this.products);
    /*
    Router Events (Navigation Events) :-
    The Router events allow us to watch for the router state changes and run some custom logic.
    One of the use case scenarios is to show the loading indicator when the user navigates from one route to another.
    You can listen to NavigationStart and NavigationEnd events to achieve this result

    The Angular Routers triggers several events starting with when the Navigation starts
    ( NavigationStart ) and also when the Navigation end ( NavigationEnd ) successfully.
    It is triggered when the navigation is canceled either by the user ( NavigationCancel ) or
    due to an error in the navigation ( NavigationError).
    The Events trigger when the lazy loaded modules are about to load and when they finish loading
    They trigger before and after the guards like canActivate, canActivateChild. Events fire before
    and after the Angular runs the Route Resolvers..
    __________
    The router.events
     is an Observable that gets triggered when the route changes. We receive NavigationEvent as
     the parameter in the callback. We check the NavigationEvent instance to check the Type of event
     fired
    */
  this.router.events.subscribe(
    (event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        console.log(event);
      }
    })
// Or you can make use of the rxjs filter operator to filter out the required events
    this.router.events
    .pipe(
      filter( event =>event instanceof NavigationStart)
    )
    .subscribe(
      (event: NavigationEvent) => {
        console.log(event);
    }
  )
   }
   ngOnInit() {
    setTimeout(() => {
     this.location.back();
     this.location.replaceState('/Lifecycle');
    }, 3000);
   }
   storeItemInLocalStorage() {
    localStorage.setItem('auth', 'true');
  }

}
