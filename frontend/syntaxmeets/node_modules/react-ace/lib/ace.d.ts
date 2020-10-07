import { Ace } from "ace-builds";
import * as AceBuilds from "ace-builds";
import * as PropTypes from "prop-types";
import * as React from "react";
import { IAceEditor, IAceOptions, ICommand, IEditorProps, IMarker } from "./types";
/**
 * See https://github.com/ajaxorg/ace/wiki/Configuring-Ace
 */
export interface IAceEditorProps {
    name?: string;
    style?: React.CSSProperties;
    /** For available modes see https://github.com/thlorenz/brace/tree/master/mode */
    mode?: string | object;
    /** For available themes see https://github.com/thlorenz/brace/tree/master/theme */
    theme?: string;
    height?: string;
    width?: string;
    className?: string;
    fontSize?: number | string;
    showGutter?: boolean;
    showPrintMargin?: boolean;
    highlightActiveLine?: boolean;
    focus?: boolean;
    cursorStart?: number;
    wrapEnabled?: boolean;
    readOnly?: boolean;
    minLines?: number;
    maxLines?: number;
    navigateToFileEnd?: boolean;
    debounceChangePeriod?: number;
    enableBasicAutocompletion?: boolean | string[];
    enableLiveAutocompletion?: boolean | string[];
    tabSize?: number;
    value?: string;
    placeholder?: string;
    defaultValue?: string;
    scrollMargin?: number[];
    enableSnippets?: boolean;
    onSelectionChange?: (value: any, event?: any) => void;
    onCursorChange?: (value: any, event?: any) => void;
    onInput?: (event?: any) => void;
    onLoad?: (editor: Ace.Editor) => void;
    onValidate?: (annotations: Ace.Annotation[]) => void;
    onBeforeLoad?: (ace: typeof AceBuilds) => void;
    onChange?: (value: string, event?: any) => void;
    onSelection?: (selectedText: string, event?: any) => void;
    onCopy?: (value: string) => void;
    onPaste?: (value: string) => void;
    onFocus?: (event: any, editor?: Ace.Editor) => void;
    onBlur?: (event: any, editor?: Ace.Editor) => void;
    onScroll?: (editor: IEditorProps) => void;
    editorProps?: IEditorProps;
    setOptions?: IAceOptions;
    keyboardHandler?: string;
    commands?: ICommand[];
    annotations?: Ace.Annotation[];
    markers?: IMarker[];
}
export default class ReactAce extends React.Component<IAceEditorProps> {
    static propTypes: PropTypes.ValidationMap<IAceEditorProps>;
    static defaultProps: Partial<IAceEditorProps>;
    editor: IAceEditor;
    refEditor: HTMLElement;
    debounce: (fn: any, delay: number) => (...args: any) => void;
    silent: boolean;
    constructor(props: IAceEditorProps);
    isInShadow(node: HTMLElement): boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IAceEditorProps): void;
    handleScrollMargins(margins?: number[]): void;
    componentWillUnmount(): void;
    onChange(event: any): void;
    onSelectionChange(event: any): void;
    onCursorChange(event: any): void;
    onInput(event?: any): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    onCopy({ text }: {
        text: string;
    }): void;
    onPaste({ text }: {
        text: string;
    }): void;
    onScroll(): void;
    handleOptions(props: IAceEditorProps): void;
    handleMarkers(markers: IMarker[]): void;
    updatePlaceholder(): void;
    updateRef(item: HTMLElement): void;
    render(): JSX.Element;
}
