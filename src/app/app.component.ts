import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
    constructor() {}

    // @HostListener('window:unload', [ '$event' ])
    // unloadHandler(event) {
    //     localStorage.clear();
    // }
  
    // @HostListener('window:beforeunload', [ '$event' ])
    // beforeUnloadHandler(event) {
    //     localStorage.clear();
    // }
}