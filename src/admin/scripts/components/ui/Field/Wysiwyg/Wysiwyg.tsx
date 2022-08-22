// https://draftjs.org/

import React, { useEffect } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

type WysiwygBaseProps = {
    value?: string,
    onChange?: (value: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
}
export type WysiwygProps = WysiwygBaseProps

const Wysiwyg = (props: WysiwygProps) => {
    const {
        value,
        onChange,
        onFocus,
        onBlur,
    } = props;

    const [ state, setState ] = React.useState(
        EditorState.createEmpty(),
    );

    const editor: React.MutableRefObject<any> = React.useRef(null);

    const focusEditor = () => editor.current.focus();

    const changeHandler = (editorState: EditorState) => {
        setState(editorState);
        const value = editorState.getCurrentContent().getPlainText();
        onChange && onChange(value);
    };

    useEffect(() => {
        focusEditor()
    }, []);

    return (
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={state}
                onChange={changeHandler}
            />
        </div>
    );
};

export default Wysiwyg;
