import { Routes } from '@angular/router';
import { ExampleDirectiveComponent } from './control-flow/example-directive.component';
import { ExampleSyntaxeComponent } from './control-flow/example-syntaxe.component';

export const routes: Routes = [
  {
    path: 'flow/directive',
    component: ExampleDirectiveComponent
  },
  {
    path: 'flow/syntaxe',
    component: ExampleSyntaxeComponent
  }
];
