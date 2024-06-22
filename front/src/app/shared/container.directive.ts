import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appContainer]',
  standalone: true,
  host: {
    '[class.bg-sky-900]': 'style() === "sky"',
    '[class.bg-slate-100]': 'style() === "light"',
    '[class.shadow-lg]': 'style() === "light"',
    '[class.shadow-slate-900/40]': 'style() === "light"',
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
