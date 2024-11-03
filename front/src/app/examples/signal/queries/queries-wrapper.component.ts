import { AfterContentInit, AfterViewInit, Component, contentChildren, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-queries-example',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div #map id="myMap"></div>
    <ng-content></ng-content>
    <p>Map title is "{{ map?.getAttribute('id') }}"</p>
    <p>{{ links().length }} links detected</p>
  `
})
export class QueriesExampleComponent implements AfterViewInit, AfterContentInit {
  map = viewChild.required('map', { read: ElementRef });
  links = contentChildren(RouterLink, { descendants: true });

  ngAfterViewInit(): void {
    console.log(this.map());
  }

  ngAfterContentInit(): void {
    console.log(this.links());
  }
}
