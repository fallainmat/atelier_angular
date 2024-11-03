import { Routes } from '@angular/router';
import { ExampleDirectiveComponent } from './control-flow/example-directive.component';
import { ExampleSyntaxeComponent } from './control-flow/example-syntaxe.component';
import { ExampleDeferComponent } from './defer/example-defer.component';
import { TriggersComponent } from './zoneless/triggers/triggers.component';
import {CounterComponent} from "./signal/counter/counter.component";
import {InputComponent} from "./signal/input/input.component";
import { QueriesDemoComponent } from './signal/queries/queries-link-content.component';

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
    path: 'signal/counter',
    component: CounterComponent
  },
  {
    path: 'signal/input',
    component: InputComponent
  },
  {
    path: 'signal/queries',
    component: QueriesDemoComponent
  },
  {
    path: 'zoneless/triggers',
    component: TriggersComponent
  }
];
