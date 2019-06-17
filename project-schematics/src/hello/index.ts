import {Rule, SchematicContext, Tree, apply, branchAndMerge, mergeWith, template, url, chain, move} from '@angular-devkit/schematics';

export default function(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...options
      }),
      move('/', options.path)
    ]);


    return chain([branchAndMerge(mergeWith(templateSource))])(host, context);
  };
}
