import React, { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/skins/ui/oxide/content.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/link";
import "tinymce/plugins/autolink";
import "tinymce/models/dom/model";

// Content styles, including inline UI like fake cursors
  /* eslint import/no-webpack-loader-syntax: off */
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';
import { setupTodolistPlugin } from "./plugins/todolist/RteTodoListPlugin";
import { todoListStyles } from "./plugins/todolist/RteTodoListPlugin.style";


setupTodolistPlugin();

interface RichTextEditorProps {

}

export const RTE: FC<RichTextEditorProps> = () => {

  return (
    <Editor
        init={{
          skin: false,
          content_css: false,
          content_style: [contentCss, contentUiCss, todoListStyles].join('\n'),
          plugins: "lists todolist",
          contextmenu: false,
          toolbar: "bullist numlist todolist"
        }}
      />
  );
};
