import { Editor } from "tinymce";
import { addDatePicker } from "./datepicker/DatePicker";

export const addPanel = (li: Element | null, editor: Editor) => {
  const { dom } = editor;
  if (!li) {
    return;
  }

  const hasPanel: boolean[] = [];
  li?.childNodes.forEach((node) => {
    hasPanel.push(dom.getAttrib(node, "data-type") === "panel");
  });

  if (hasPanel.some((x) => x)) {
    return;
  }

  const panel = dom.create("span", {
    contenteditable: "false",
    "data-type": "panel",
    class: "todo-list-item-panel",
  });

  const assigneeButton = dom.create("span", {
    contenteditable: "false",
    class: "assignee-button",
    "data-type": "assignee-button",
  });

  assigneeButton.append(
    dom.create("span", {
      class: "assignee-button-img",
    })
  );

  addDatePicker(panel, editor, li);
  panel.append(assigneeButton);

  li.append(panel);
};

export const toggleOnTodoList = (ul: Element, editor: Editor) => {
  for (let index = 0; index < ul.children.length; index += 1) {
    addPanel(ul.children.item(index), editor);
  }
  editor.dom.setAttrib(ul, "data-todolist-toggle", true);
};

export const toggleOffTodoList = (ul: Element, editor: Editor) => {
  const { dom } = editor;
  dom.removeClass(ul, "todo-list");
  dom.removeClass(ul, "tox-todo-list");
  dom.setAttrib(ul, "data-todolist-toggle", false);
  for (let index = 0; index < ul.children.length; index += 1) {
    const li = ul.children.item(index);
    if (!li) {
      break;
    }
    dom.removeClass(li, "todo-list-item");
    dom.removeAllAttribs(li);
    li.childNodes.forEach((panel) => {
      if (dom.hasClass(panel, "todo-list-item-panel")) {
        li.removeChild(panel);
      }
    });
  }
  dom.removeAllAttribs(ul);
};
