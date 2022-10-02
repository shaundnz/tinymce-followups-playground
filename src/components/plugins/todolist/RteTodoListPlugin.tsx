import { TinyMCE, Editor} from "tinymce/tinymce";
import { CheckIcon } from "@rcl2/primitives/icon";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { inBulletedList, inNumberedList, inTodoList } from "./ListUtils";
import { setupEvents } from "./setupEvents";
import { onToggleTodoList } from "./TodoListButton";
import * as Util from "./Util";

declare const tinymce: TinyMCE;

const createTodoList = (editor: Editor) => {

  editor.execCommand("InsertUnorderedList", true, {
    // "list-style-type": "none",
    "list-attributes": { class: "todo-list tox-todo-list" },
    });
}

const onAction = (api: any, editor: Editor) => {

  const listElm = editor.dom.getParents(editor.selection.getNode(), 'ol,ul');

  // 3 cases
  // -------
  // 1. inTodoList -> Remove it
  // 2. In any other type of list -> Convert it to todolist
  // 3. Otherwise create the todolist
  if (Util.inTodoList(listElm, "UL")) {
    editor.execCommand("RemoveList")
  } 
  else if (Util.inList(listElm, "UL") || Util.inList(listElm, "OL")) {

    const parentList = editor.dom.getParent(editor.selection.getNode(), 'ol,ul')
    if (parentList) {
      editor.dom.replace(editor.dom.create('ul', {class: "todo-list tox-todo-list"}), parentList, true)
      editor.nodeChanged()
    }
  }
  else {
    createTodoList(editor)
  }

} 

const setupMyEvents = (editor: Editor) => {
  editor.on("ListMutation", ({action, element}) => {
    console.log ("---LISTMUTATION---")
    console.log(action)
    console.log(element)


    // If within a todolist and list toggle called => Remove styles
    if (element && (action === "ToggleUlList" || action === "ToggleOlList")) {
      element.removeAttribute('class')
      element.removeAttribute('type')
      editor.nodeChanged()
    }
  })


  // Undo the indent action if we are within a todolist and tab is pressed
  editor.on("keydown", (e) => {
    console.log(e)
    const listElm = editor.dom.getParents(editor.selection.getNode(), 'ol,ul');
    if (e.code === "Tab" && !e.shiftKey && Util.inTodoList(listElm, "UL")) {
      editor.undoManager.undo()
    }
  })

  editor.on('ExecCommand', ({command, ui, value}) => {
    console.log ("---EXECCOMMAND---")
    console.log(command)
    console.log(ui)
    console.log(value)
  })
}

const setup = (editor: Editor): void => {
  editor.ui.registry.addIcon("todolist", renderToStaticMarkup(<CheckIcon />));

  editor.options.register("todoListConfig", {
    processor: "object",
  });

  editor.ui.registry.addToggleButton("todolist", {
    icon: "todolist",
    onAction: (api) => onAction(api, editor),
    onSetup: (api) => {
      const toggleButtonHandler = (e: Util.NodeChangeEvent) => {
        api.setActive(Util.inTodoList(e.parents, "UL"));
        api.setEnabled(!Util.isWithinNonEditableList(editor, e.element));
      };
      return Util.setNodeChangeHandler(editor, toggleButtonHandler);
    },
  });

  setupMyEvents(editor);
};

export const setupTodolistPlugin = (): void => {
  tinymce.PluginManager.add("todolist", setup);
};
