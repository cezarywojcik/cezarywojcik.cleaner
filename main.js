/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
  "use strict";

  var CommandManager  = brackets.getModule("command/CommandManager"),
      Menus           = brackets.getModule("command/Menus"),
      EditorManager   = brackets.getModule("editor/EditorManager"),
      DocumentManager = brackets.getModule("document/DocumentManager");

  function clean() {
    var txt = DocumentManager.getCurrentDocument().getText();
    // remove trailing whitespace
    txt = txt.replace(/[^\S\n]+$/gm, "");
    // add newline if there is no newline
    var lastChar = txt.charAt(txt.length-1);
    if (lastChar !== "\n") {
      txt += "\n";
    }
    // get cursor position
    var cursorPos = EditorManager.getCurrentFullEditor().getCursorPos();
    // add cleaned text
    DocumentManager.getCurrentDocument().setText(txt);
    // apply cursor position
    EditorManager.getCurrentFullEditor().setCursorPos(cursorPos);
  }

  var FORMAT_ID = "cezarywojcik.clean";
  CommandManager.register("Clean", FORMAT_ID, clean);

  var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
  menu.addMenuItem(FORMAT_ID, "Ctrl-Alt-C");
});
