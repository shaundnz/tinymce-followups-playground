import { TinyMCE, Editor } from "tinymce";
import { TinyMCEEditor } from "../types";
import { getSelectedListItem, splitLists } from "./ListUtils";
import { toggleOffTodoList, toggleOnTodoList } from "./PanelUtils";

export const setupEvents = (editor: Editor) => {
  editor.on("click", (event) => {
    const { dom } = editor;
    const mouseEvt = event;
    if (!mouseEvt || mouseEvt.offsetX > 0) {
      return;
    }
    const li = event.target;
    if (!dom.hasClass(li, "todo-list-item")) return;
    const checked = dom.hasClass(li, "checked");
    if (checked) {
      dom.removeClass(li, "checked");
    } else {
      dom.addClass(li, "checked");
    }
  });

  editor.on("ListMutation", (e) => {
    if (e.action === "IndentList") {
      console.log(e.element)
      console.log(editor.undoManager.undo())
      return false
    }
    return false
  })

  // editor.on("keydown", (event) => {
  //   const { dom } = editor;
  //   const handleEnter = () => {
  //     const { li, ul, isTodo } = getSelectedListItem(editor);

  //     if (!li || !isTodo || !dom.hasClass(li, "todo-list-item")) {
  //       return;
  //     }

  //     setTimeout(() => {
  //       toggleOnTodoList(ul, editor);
  //     }, 0);
  //   };

  //   const handleTab = () => {
  //     const { isTodo } = getSelectedListItem(editor);

  //     if (isTodo) {
  //       console.log(editor.undoManager.undo());
  //     }
  //   };

  //   switch (event.key.toLowerCase()) {
  //     case "enter":
  //       handleEnter();
  //       break;
  //     case "tab":
  //       // handleTab();
  //       break;
  //     default:
  //       break;
  //   }
  // });

  // editor.on("ListMutation", () => {
  //   const { li, ul, isTodo, isToggledOn, isNested, rootList } =
  //     getSelectedListItem(editor);
  //   const { dom } = editor;

  //   if (!li || !isTodo || !dom.hasClass(li, "todo-list-item")) {
  //     return;
  //   }

  //   if (isToggledOn) {
  //     toggleOffTodoList(ul, editor);
  //   } else {
  //     toggleOnTodoList(ul, editor);
  //   }

  //   if (isNested) {
  //     console.log(splitLists(rootList, editor));
  //   }
  // });
};
