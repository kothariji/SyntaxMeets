import * as AceBuilds from "ace-builds";
declare type EditorOption = "minLines" | "maxLines" | "readOnly" | "highlightActiveLine" | "tabSize" | "enableBasicAutocompletion" | "enableLiveAutocompletion" | "enableSnippets";
declare const editorOptions: EditorOption[];
declare type EditorEvent = "onChange" | "onFocus" | "onInput" | "onBlur" | "onCopy" | "onPaste" | "onSelectionChange" | "onCursorChange" | "onScroll" | "handleOptions" | "updateRef";
declare const editorEvents: EditorEvent[];
declare global {
    namespace NodeJS {
        interface Global {
            window: any;
        }
    }
}
declare const getAceInstance: () => typeof AceBuilds;
declare const debounce: (fn: (...args: any[]) => void, delay: number) => () => void;
export { editorOptions, editorEvents, debounce, getAceInstance };
