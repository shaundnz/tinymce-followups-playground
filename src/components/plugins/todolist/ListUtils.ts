import { Editor } from "tinymce";

export const isList = (node: Element) =>
  node.nodeName.toLowerCase() === "ol" || node.nodeName.toLowerCase() === "ul";

export const isTodoList = (node: Element, editor: Editor) =>
  node.nodeName.toLowerCase() === "ul" &&
  editor.dom.hasClass(node, "todo-list");

export const inTodoList = (parents: Node[], editor: Editor) => {
  return parents.some(
    (x: Node) =>
      x.nodeName.toLowerCase() === "ul" && editor.dom.hasClass(x, "todo-list")
  );
};

export const inBulletedList = (parents: Node[], editor: Editor) => {
  return parents.some(
    (x: Node) =>
      x.nodeName.toLowerCase() === "ul" && !editor.dom.hasClass(x, "todo-list")
  );
};

export const inNumberedList = (parents: Node[], editor: Editor) => {
  return parents.some(
    (x: Node) =>
      x.nodeName.toLowerCase() === "ol" && !editor.dom.hasClass(x, "todo-list")
  );
};

export const getSelectedListItem = (editor: Editor) => {
  const { dom } = editor;
  const range = editor.selection.getRng();
  const defaultValue = {
    li: null,
    ul: null,
    isTodo: false,
    isDecorated: false,
    isNested: false,
    hasChildLists: false,
    rootList: null,
    isToggledOn: false,
  };

  const li =
    range.startContainer.nodeName.toLowerCase() === "li"
      ? range.startContainer
      : range.startContainer.parentElement;

  const ul = li?.parentElement;

  if (!li || !ul) {
    return defaultValue;
  }

  const parents = dom.getParents(li);

  const rootList = parents.filter((x) => isList(x)).pop();

  if (!rootList) {
    return defaultValue;
  }

  const isNested =
    dom
      .getParents(ul)
      .filter(
        (x: Node) =>
          x.nodeName.toLowerCase() === "ol" ||
          (x.nodeName.toLowerCase() === "ul" &&
            !editor.dom.hasClass(x, "todo-list"))
      ).length > 1;

  return {
    li,
    ul,
    parents,
    isNested,
    rootList,
    hasChildLists: ul && !!ul.querySelector("ul"),
    isTodo: ul && editor.dom.hasClass(ul, "todo-list"),
    isToggledOn: ul && dom.getAttrib(ul, "data-todolist-toggle"),
  };
};

export const splitLists = (
  rootList: Element,
  editor: Editor
): Array<Array<Node>> | null => {
  if (!rootList) {
    return null;
  }

  const listItems: {
    isTodoList: boolean;
    li: HTMLLIElement;
    ul: HTMLElement | null;
  }[] = [];

  rootList.querySelectorAll("li").forEach((li) => {
    listItems.push({
      isTodoList: !!(li.parentElement && isTodoList(li.parentElement, editor)),
      li,
      ul: li.parentElement,
    });
  });

  return listItems.reduce((previousValue: any, currentList: any): any => {
    const result = !Array.isArray(previousValue)
      ? [[previousValue]]
      : previousValue;
    const previousGroup = result[result.length - 1];
    const previousList = previousGroup[0];

    if (currentList.isTodoList === previousList.isTodoList) {
      return [
        ...result.splice(0, result.length - 1),
        [currentList, ...result[result.length - 1]],
      ];
    }

    return [...result, [currentList]];
  }) as unknown as Array<Array<Node>>;
};
