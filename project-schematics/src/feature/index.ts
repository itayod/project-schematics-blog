import {Rule, Tree, SchematicContext, chain, externalSchematic} from '@angular-devkit/schematics';
import {Schema as NgrxContainer} from '@ngrx/schematics/src/container/schema';
import {Schema as NgrxFeatureOptions} from '@ngrx/schematics/src/feature/schema';
import {Schema as ModuleOptions} from '@schematics/angular/module/schema';

export default function(options: { name: string; path?: string }): Rule {
  return (host: Tree, context: SchematicContext) => {

    return chain([
      externalSchematic('@schematics/angular', 'module', {
        ...options,
        routing: true,
        flat: false
      } as ModuleOptions),
      externalSchematic('@ngrx/schematics', 'container', {
        ...options,
        module: options.name,
        flat: false
      } as NgrxContainer),
      externalSchematic('@ngrx/schematics', 'feature', {
        ...options,
        flat: false,
        module: options.name,
        creators: true
      } as NgrxFeatureOptions)
    ])(host, context);
  };
}
