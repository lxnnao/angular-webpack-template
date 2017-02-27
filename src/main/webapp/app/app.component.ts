import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
    selector: 'general',
    template: `
        <router-outlet></router-outlet>
    `
})
export class AppComponent {

};