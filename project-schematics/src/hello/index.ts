import {Rule, SchematicContext, Tree, apply, mergeWith, template, url, move} from '@angular-devkit/schematics';

export default function(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...options
      }),
      move('/', options.path)
    ]);


    return mergeWith(templateSource)(host, context);
  };
}
