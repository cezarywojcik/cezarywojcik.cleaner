/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
  "use strict";

  var CommandManager  = brackets.getModule("command/CommandManager"),
      Menus           = brackets.getModule("command/Menus"),
      EditorManager   = brackets.getModule("editor/EditorManager"),
      Editor          = brackets.getModule("editor/Editor").Editor,
      DocumentManager = brackets.getModule("document/DocumentManager");

  function clean() {
    // get doc and editor
    var CurrentEditor = EditorManager.getCurrentFullEditor();
    var Document = DocumentManager.getCurrentDocument();

    // get document content
    var txt = Document.getText();

    // remove trailing whitespace
    txt = txt.replace(/[^\S\n]+$/gm, "");

    // replace any tabs with spaces
    if (!Editor.getUseTabChar()) {
      var tabSize = Editor.getSpaceUnits();
      var spaces = new Array(tabSize+1).join(" ");
      txt = txt.replace(/\t/gm, spaces);
    }

    // add newline at end of file if there is no newline
    var lastChar = txt.charAt(txt.length-1);
    if (lastChar !== "\n") {
      txt += "\n";
    }

    // get cursor position
    var cursorPos = CurrentEditor.getCursorPos();

    // add cleaned text
    Document.setText(txt);

    // apply cursor position
    CurrentEditor.setCursorPos(cursorPos);
  }

  var FORMAT_ID = "cezarywojcik.clean";
  CommandManager.register("Clean", FORMAT_ID, clean);

  var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
  menu.addMenuDivider();
  menu.addMenuItem(FORMAT_ID, "Ctrl-Alt-C");
});
