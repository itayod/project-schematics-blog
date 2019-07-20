import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {
  getTestProjectPath,
  createWorkspace,
  defaultWorkspaceOptions,
  defaultAppOptions
} from '../utils/create-workspace';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Feature', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  beforeEach(() => {
    appTree = createWorkspace(schematicRunner, appTree);
  });

  it('should create a proper module', () => {
    const options = {
      name: 'foo',
      project: 'baz'
    };

    const specifiedProjectPath = getTestProjectPath(defaultWorkspaceOptions, {
      ...defaultAppOptions,
      name: 'baz'
    });

    const tree = schematicRunner.runSchematic('feature', options, appTree);
    const content = tree.readContent(`${specifiedProjectPath}/src/lib/foo/foo.module.ts`);

    expect(content).toMatchSnapshot();
  });
});
