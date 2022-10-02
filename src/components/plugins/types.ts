import { IAllProps } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

type customToolbarItem = {
  /** Name which specify into the toolbar. */
  toolbarName: string;
  /** Icon name. */
  iconName: string;
  /** Label of the icon. */
  label: string;
  /** Action Onclick. */
  onAction: (editor: any) => void;
};

export type ContainerProps = {
  showStatusBarBorder: boolean;
  required: boolean;
  showError: boolean;
  characterLimitError: boolean;
};

interface ExecCommandEvent {
  command: string;
  ui?: boolean;
  value?: any;
}

export type EditorLabelSize = "medium" | "small";
export interface RichTextEditorProps {
  /** Initial value of the editor. */
  initialValue?: string;
  /** Custom toolbar item apart from the exiting toolboor. */
  customToolbarItems?: customToolbarItem[];
  /** Output formate from the editor String | Html. */
  outputFormat?: "text" | "html";
  /** Initialize thing before the editor initialize. */
  // onEditorInit: IAllProps["onInit"];

  /** Should the editor be in read-only mode. */
  disabled?: boolean;
  /** An event handler for notifying when the editor is about to create an undo level, and preventing it if required  */
  onEditorBeforeAddUndo?: IAllProps["onBeforeAddUndo"];
  /** Inline used to set the editor to inline mode.  */
  inline?: boolean;
  /** For the configuring the toolbar item and style of the toolbar.  */
  config?: {
    /** toolbar like: "bold italic underline".  */
    toolbar?: string;
    /** for applying custom style to the input items. */
    content_css?: boolean;
    /** for specifying the skin for the tinymce.  */
    skin?: boolean;
    /** for enabling menubar in the editor. */
    menubar?: boolean;
  };
  /** for enabling tag descriptor in the editor. */
  showElementPath?: boolean;
  /** To show/hide status bar in the editor. If provided `false` value it removes the resize ability of editor. */
  showStatusBar?: boolean;
  /** to make editor required */
  required?: boolean;
  /** label */
  editorLabel?: string;
  /** Editor Label size */
  editorLabelSize?: EditorLabelSize;
  /** Error Message for required field */
  errorMessage?: string;
  /** To show character count in status bar */
  showCharacterCount?: boolean;
  /** character limit to show error */
  characterLimit?: number;
  /** To get the content of editor */
  onEditorBlur: (value: string) => void;
  /** To set error style */
  hasError?: boolean;
  /** On focus action */
  onEditorFocus?: (value: string) => void;
  /** on editor change action */
  onEditorChange?: (value: string) => void;
  /** on execute command action, ExecCommand is a event internal to TinyMCE */
  onExecCommand?: ({ command, ui, value }: ExecCommandEvent) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Enable links in the editor */
  link?: boolean;
  /** Toolbar location auto, top, bottom */
  toolbarLocation?: "auto" | "top" | "bottom";
  /** Toolbar mode to show the toolbar buttons which are not rendered due to screen size limit */
  toolbarMode?: "floating" | "sliding" | "wrap" | "scrolling";
  /** Editor height */
  height?: number;
  /** Container target for inline editor toolbar */
  fixedToolbarContainer?: string;
  /** Enable the todolist plugin */
  todolist?: boolean;
  /** Assignee config for the todolist plugin */
  todoListConfig?: any;
}

export { TinyMCEEditor };
