import { Editor, Schema } from "tinymce";
import { Optional } from "./Optional";
import * as Type from "./Type";

const isCustomList = (list: HTMLElement): boolean =>
  /\btox\-/.test(list.className);

const isTodoList = (list: HTMLElement): boolean =>
  /\btox-todo-list/.test(list.className);

const matchNodeNames = <T extends Node = Node>(regex: RegExp) => (
  node: Node | null
): node is T => Type.isNonNullable(node) && regex.test(node.nodeName);

const isListNode = matchNodeNames<
  HTMLOListElement | HTMLUListElement | HTMLDListElement
>(/^(OL|UL|DL)$/);

const isTableCellNode = matchNodeNames<
  HTMLTableHeaderCellElement | HTMLTableCellElement
>(/^(TH|TD)$/);

export const isListItemNode = matchNodeNames<HTMLLIElement | HTMLElement>(
  /^(LI|DT|DD)$/
);

type ArrayMorphism<T, U> = (x: T, i: number) => U;
type ArrayGuardPredicate<T, U extends T> = (x: T, i: number) => x is U;
type ArrayPredicate<T> = ArrayMorphism<T, boolean>;
type Comparator<T> = (a: T, b: T) => number;

export interface NodeChangeEvent {
  element: Element;
  parents: Node[];
  selectionChange?: boolean;
  initial?: boolean;
}

export const findUntil: {
  <T, U extends T>(
    xs: ArrayLike<T>,
    pred: ArrayGuardPredicate<T, U>,
    until: ArrayPredicate<T>
  ): Optional<U>;
  <T = any>(
    xs: ArrayLike<T>,
    pred: ArrayPredicate<T>,
    until: ArrayPredicate<T>
  ): Optional<T>;
} = <T>(
  xs: ArrayLike<T>,
  pred: ArrayPredicate<T>,
  until: ArrayPredicate<T>
): Optional<T> => {
  for (let i = 0, len = xs.length; i < len; i++) {
    const x = xs[i];
    if (pred(x, i)) {
      return Optional.some(x);
    } else if (until(x, i)) {
      break;
    }
  }
  return Optional.none();
};

export const exists = <T = any>(
  xs: ArrayLike<T>,
  pred: ArrayPredicate<T>
): boolean => {
  for (let i = 0, len = xs.length; i < len; i++) {
    const x = xs[i];
    if (pred(x, i)) {
      return true;
    }
  }

  return false;
};

const constant = <T>(value: T): (() => T) => {
  return () => {
    return value;
  };
};

const never: (...args: any[]) => false = constant<false>(false);

export const find: {
  <T, U extends T>(
    xs: ArrayLike<T>,
    pred: ArrayGuardPredicate<T, U>
  ): Optional<U>;
  <T = any>(xs: ArrayLike<T>, pred: ArrayPredicate<T>): Optional<T>;
} = <T>(xs: ArrayLike<T>, pred: ArrayPredicate<T>): Optional<T> => {
  return findUntil(xs, pred, never);
};

export const inList = (parents: Node[], listName: string): boolean =>
  findUntil(parents, isListNode, isTableCellNode).exists(
    (list) => list.nodeName === listName && !isCustomList(list)
  );

export const inTodoList = (parents: Node[], listName: string): boolean =>
  findUntil(parents, isListNode, isTableCellNode).exists(
    (list) => list.nodeName === listName && isTodoList(list)
  );

const isWithinNonEditable = (
  editor: Editor,
  element: Element | null
): boolean =>
  element !== null && editor.dom.getContentEditableParent(element) === "false";

const listNames = ["OL", "UL", "DL"];
const listSelector = listNames.join(",");

const isListHost = (schema: Schema, node: Node): boolean =>
  isListNode(node) &&
  isListItemNode(node) &&
  exists(listNames, (listName) => schema.isValidChild(node.nodeName, listName));

const getClosestListHost = (editor: Editor, elm: Node): HTMLElement => {
  const parentBlocks = editor.dom.getParents<HTMLElement>(
    elm,
    editor.dom.isBlock
  );
  const parentBlock = find(parentBlocks, (elm) =>
    isListHost(editor.schema, elm)
  );

  return parentBlock.getOr(editor.getBody());
};

const getParentList = (editor: Editor, node?: Node): HTMLElement | null => {
  const selectionStart = node || editor.selection.getStart(true);

  return editor.dom.getParent(
    selectionStart,
    listSelector,
    getClosestListHost(editor, selectionStart)
  );
};

const selectionIsWithinNonEditableList = (editor: Editor): boolean => {
  const parentList = getParentList(editor);
  return isWithinNonEditable(editor, parentList);
};

export const isWithinNonEditableList = (
  editor: Editor,
  element: Element | null
): boolean => {
  const parentList = editor.dom.getParent(element as Element, "ol,ul,dl");
  return isWithinNonEditable(editor, parentList);
};

export const setNodeChangeHandler = (
  editor: Editor,
  nodeChangeHandler: (e: NodeChangeEvent) => void
): (() => void) => {
  const initialNode = editor.selection.getNode();
  // Set the initial state
  nodeChangeHandler({
    parents: editor.dom.getParents(initialNode),
    element: initialNode,
  });
  editor.on("NodeChange", nodeChangeHandler);
  return () => editor.off("NodeChange", nodeChangeHandler);
};

