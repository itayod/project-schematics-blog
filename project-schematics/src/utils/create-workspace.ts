import {
  UnitTestTree,
  SchematicTestRunner,
} from '@angular-devkit/schematics/testing';

export const defaultWorkspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '8.0.0',
  defaultProject: 'bar',
};

export const defaultAppOptions = {
  name: 'bar'
};

const defaultLibOptions = {
  name: 'baz'
};

export function getTestProjectPath(
  workspaceOptions: any = defaultWorkspaceOptions,
  appOptions: any = defaultAppOptions
) {
  return `/${workspaceOptions.newProjectRoot}/${appOptions.name}`;
}

export function createWorkspace(
  schematicRunner: SchematicTestRunner,
  appTree: UnitTestTree,
  workspaceOptions = defaultWorkspaceOptions,
  appOptions = defaultAppOptions,
  libOptions = defaultLibOptions
) {
  appTree = schematicRunner.runExternalSchematic(
    '@schematics/angular',
    'workspace',
    workspaceOptions
  );
  appTree = schematicRunner.runExternalSchematic(
    '@schematics/angular',
    'application',
    appOptions,
    appTree
  );
  appTree = schematicRunner.runExternalSchematic(
    '@schematics/angular',
    'library',
    libOptions,
    appTree
  );

  return appTree;
}
