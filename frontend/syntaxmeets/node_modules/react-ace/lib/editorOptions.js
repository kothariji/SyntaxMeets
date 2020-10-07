"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editorOptions = [
    "minLines",
    "maxLines",
    "readOnly",
    "highlightActiveLine",
    "tabSize",
    "enableBasicAutocompletion",
    "enableLiveAutocompletion",
    "enableSnippets"
];
exports.editorOptions = editorOptions;
var editorEvents = [
    "onChange",
    "onFocus",
    "onInput",
    "onBlur",
    "onCopy",
    "onPaste",
    "onSelectionChange",
    "onCursorChange",
    "onScroll",
    "handleOptions",
    "updateRef"
];
exports.editorEvents = editorEvents;
var getAceInstance = function () {
    var ace;
    if (typeof window === "undefined") {
        // ace-builds just needs some window object to attach ace to.
        // During SSR even just an empty object will work.
        global.window = {};
        ace = require("ace-builds");
        // And it can be discarded immediately afterward to avoid confusing
        // other libraries that might detect SSR the same way we did.
        delete global.window;
    }
    else if (window.ace) {
        // Fallback for ace.require when vanilla ACE is hosted over a CDN
        ace = window.ace;
        ace.acequire = window.ace.require || window.ace.acequire;
    }
    else {
        ace = require("ace-builds");
    }
    return ace;
};
exports.getAceInstance = getAceInstance;
var debounce = function (fn, delay) {
    var timer = null;
    // tslint:disable-next-line
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};
exports.debounce = debounce;
//# sourceMappingURL=editorOptions.js.map