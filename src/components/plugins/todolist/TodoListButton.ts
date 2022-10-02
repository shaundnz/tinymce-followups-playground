import { Editor } from "tinymce";
import { getSelectedListItem } from "./ListUtils";

export const onToggleTodoList = (editor: Editor) => {
  const { hasChildLists, isNested, li, ul, rootList } =
    getSelectedListItem(editor);
  const { dom } = editor;
  if (li && hasChildLists && !isNested && ul?.lastChild === li) {
    const liCopy = editor.dom.clone(li, true);
    editor.dom.remove(li);
    const newList = dom.create("ul", { class: "todo-list tox-todo-list" });
    newList.append(liCopy);
    dom.insertAfter(newList, rootList);
    editor.selection.select(liCopy);
  }

  editor.execCommand("InsertUnorderedList", true, {
    "list-style-type": "none",
    "list-attributes": { class: "todo-list tox-todo-list" },
    "list-item-attributes": {
      class: "todo-list-item",
      "data-date": "2022-2-9",
    },
  });
};

