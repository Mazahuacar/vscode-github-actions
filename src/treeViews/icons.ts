import * as vscode from "vscode";

let _context: vscode.ExtensionContext;
export function initResources(context: vscode.ExtensionContext) {
  _context = context;
}

export interface IStatusAndConclusion {
  status: string | null;
  conclusion: string | null;
}

export function getAbsoluteIconPath(relativeIconPath: string): {
  light: string | vscode.Uri;
  dark: string | vscode.Uri;
} {
  return {
    light: _context.asAbsolutePath(`resources/icons/light/${relativeIconPath}`),
    dark: _context.asAbsolutePath(`resources/icons/dark/${relativeIconPath}`)
  };
}

export function getIconForWorkflowRun(runOrJob: IStatusAndConclusion) {
  return _getIconForWorkflowrun(runOrJob);
}

function _getIconForWorkflowrun(
  runOrJob: IStatusAndConclusion
): string | vscode.ThemeIcon | {light: string | vscode.Uri; dark: string | vscode.Uri} {
  switch (runOrJob.status) {
    case "completed": {
      switch (runOrJob.conclusion) {
        case "success":
          return getAbsoluteIconPath("conclusions/success.svg");

        case "failure":
          return getAbsoluteIconPath("conclusions/failure.svg");

        case "skipped":
        case "cancelled":
        case "skipped":
          return getAbsoluteIconPath("conclusions/cancelled.svg");
      }
      break;
    }

    case "queued":
      return getAbsoluteIconPath("statuses/queued.svg");

    case "waiting":
      return getAbsoluteIconPath("statuses/waiting.svg");

    case "inprogress":
    case "in_progress":
      return new vscode.ThemeIcon("sync~spin");
  }

  return "";
}

/** Get one of the built-in VS Code icons */
export function getCodIconForWorkflowrun(runOrJob?: IStatusAndConclusion): string {
  if (!runOrJob) {
    return "circle-outline";
  }

  switch (runOrJob.status) {
    case "completed": {
      switch (runOrJob.conclusion) {
        case "success":
          return "pass";

        case "failure":
          return "error";

        case "skipped":
        case "cancelled":
        case "skipped":
          return "circle-slash";
      }
      break;
    }

    case "queued":
      return "primitive-dot";

    case "waiting":
      return "bell";

    case "inprogress":
    case "in_progress":
      return "sync~spin";
  }

  // Default to circle if there is no match
  return "circle";
}
