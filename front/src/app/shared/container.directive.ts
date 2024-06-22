import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appContainer]',
  standalone: true,
  host: {
    '[class.bg-sky-900]': 'style() === "sky"',
    '[class.bg-slate-200]': 'style() === "light"',
    '[class.shadow-inner-xl]': 'style() === "light"',
    '[class.m-2]': 'margin() === true',
    '[class.mb-0]': 'margin() === true'
  }
})
export class ContainerDirective {
  @HostBinding('class')
  elementClass = 'p-2 rounded-md';
  style = input.required<'light' | 'sky'>({ alias: 'appContainer' });
  margin = input<boolean>(true);
}
