import { SingleDateValue } from "@rcl2/primitives/date-picker";
import React from "react";
import ReactDOM from "react-dom";
import { Editor } from "tinymce";
import { DatePickerComponent } from "./DatePickerComponent";

export const initializeDatePicker = (editor: Editor) => {
  const { dom } = editor;
  const datePickerPopup = dom.create("div", { id: "rte-datepicker-instance" });
  // Below float panels and context menu, but above maximized editor (-5).
  dom.setStyle(datePickerPopup, "z-index", 10000 - 3);
  dom.setStyle(datePickerPopup, "display", "none");
  dom.setStyle(datePickerPopup, "position", "absolute");
  window.document.body.append(datePickerPopup);
};

export const addDatePicker = (
  panel: HTMLSpanElement,
  editor: Editor,
  li: Element
) => {
  const { dom } = editor;

  const dueDateButton = dom.create("span", {
    contenteditable: "false",
    class: "datepicker-button",
    "data-type": "datepicker-button",
  });

  dueDateButton.append(
    dom.create("span", {
      class: "datepicker-button-img",
    })
  );

  dom.bind(dueDateButton, "click", () => {
    const datePickerPopup = window.document.body.children.namedItem(
      "rte-datepicker-instance"
    );

    if (!datePickerPopup) {
      return;
    }

    const val = "";
    const dateRegex = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    const matches = dateRegex.exec(val);
    const valDate = matches
      ? new Date(
          parseInt(matches[1], 10),
          parseInt(matches[2], 10) - 1,
          parseInt(matches[3], 10)
        )
      : undefined;
    const config = editor.options.get("todolist")?.datepicker || {};

    const normalizeDateFormat = (date: SingleDateValue) => {
      return date
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : null;
    };

    const formatDate = (date: SingleDateValue) => {
      const dateStr = normalizeDateFormat(date);
      return dateStr ? config.dateFormat?.(dateStr) ?? dateStr : null;
    };

    const setBtnContent = (dateStr: string | null) => {
      if (dueDateButton) {
        const formatted = dateStr
          ? config.dateFormat?.(dateStr) ?? dateStr
          : null;
        dom.setHTML(
          dueDateButton,
          formatted
            ? `<span contenteditable="false" class="due-date--selected">${dateStr}</span>`
            : `<span class="datepicker-button-img" </span>`
        );
      }
    };

    const setDate = (date: string | false | null) => {
      dom.setAttrib(li, "data-date", date ?? false);
      dom.fire(li, "change");
      dom.setStyle(datePickerPopup, "display", "none");

      if (date) {
        setBtnContent(date);
      }
    };

    ReactDOM.render(
      <DatePickerComponent
        id="rte-date-picker"
        value={valDate}
        onChange={(date: SingleDateValue) => setDate(normalizeDateFormat(date))}
        onClear={() => setDate(null)}
        localization={{
          localizationGroups: [],
        }}
        i18n={config.i18n}
        defaultDates={config.defaultDates}
        onDefaultDateChosen={config.onDefaultDateChosen}
        formatDate={(date) => formatDate(date)}
        theming={(window as any)?.csod?.context?.theming ?? {}}
      />,
      window.document.getElementById("rte-datepicker-instance")
    );
    dom.setStyle(datePickerPopup, "display", "block");
    dom.setStyle(
      datePickerPopup,
      "left",
      panel.offsetLeft + (editor.contentAreaContainer?.offsetLeft || 0) - 100
    );
    dom.setStyle(
      datePickerPopup,
      "top",
      panel.offsetTop + (editor.contentAreaContainer?.offsetTop || 0)
    );
  });

  panel.append(dueDateButton);
};
