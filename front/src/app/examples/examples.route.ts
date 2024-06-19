import { Routes } from '@angular/router';
import { ExampleDirectiveComponent } from './control-flow/example-directive.component';
import { ExampleSyntaxeComponent } from './control-flow/example-syntaxe.component';
import { ExampleDeferComponent } from './defer/example-defer.component';
import { TriggersComponent } from './zoneless/triggers/triggers.component';

export const routes: Routes = [
  {
    path: 'flow/directive',
    component: ExampleDirectiveComponent
  },
  {
    path: 'flow/syntaxe',
    component: ExampleSyntaxeComponent
  },
  {
    path: 'defer/simple',
    component: ExampleDeferComponent
  },
  {
    path: 'zoneless/triggers',
    component: TriggersComponent
  }
];
