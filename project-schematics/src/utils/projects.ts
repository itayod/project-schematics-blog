import {WorkspaceProject} from '@angular-devkit/core/src/workspace';
import {getWorkspace} from '@angular/cli/utilities/config';

export function getProject(): WorkspaceProject | null {
  let project = null;
  const workspace = getWorkspace();
  if (workspace) {
    const projectName = workspace.getDefaultProjectName();
    project = workspace.getProject(<string>projectName);
  }
  return project;
}