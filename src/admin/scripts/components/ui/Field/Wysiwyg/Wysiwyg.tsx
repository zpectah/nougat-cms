// https://draftjs.org/

import React, { useEffect, useMemo, useState } from 'react';
import { merge } from 'lodash';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import { Box, styled, BoxProps } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import { Button } from '../../Button';
import { useIcons } from '../../Icons';
import defaultToolbar from './toolbar';

const EditorWrapper = styled(Box)(({ theme }) => `
    margin: 0;
    padding: 0;
    border: 1px solid ${theme.palette.divider};
    border-radius: ${theme.shape.borderRadius};
    
    .ui-wysiwyg{
        &-wrapper{
            margin: 0;
            padding: 0;
            background: transparent;   
        }
        &-toolbar{
            margin: 0;
            padding: ${theme.spacing(1)};
            
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: .125rem;
            
            border: 0;
            border-bottom: 1px solid ${theme.palette.divider};
            background: transparent;  
            
            & > div{
                margin: 0;
                padding: 0;
                gap: .125rem;            
            }            
            
        }
        &-editor{
            height: 45vh; 
            min-height: 300px;
            margin: 0;
            padding: ${theme.spacing(2)};
            color: ${theme.palette.getContrastText(theme.palette.background.paper)};
            background-color: ${theme.palette.background.paper};
        }
        
        &-button{
            min-width: 36px;
            height: 36px;
            margin: 0;
            padding: 0 .25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${theme.palette.getContrastText(theme.palette.background.paper)};            
            border: 1px solid ${theme.palette.divider};
            border-radius: ${theme.shape.borderRadius};
            background-color: ${theme.palette.background.paper};     
            text-decoration: none; 
            
            &:hover{
                box-shadow: ${theme.shadows[1]};
            }
        }
        
    }
    
    .rdw-option-wrapper{
        min-width: 36px;
        height: 36px;
        margin: 0;
        padding: 0;
        gap: .125rem;          
        border: 1px solid ${theme.palette.divider};
        border-radius: ${theme.shape.borderRadius};
        background-color: ${theme.palette.background.paper};      
        
        &:hover{
            box-shadow: ${theme.shadows[1]};
        }
        &:active{
            box-shadow: ${theme.shadows[2]};
        }
        &.rdw-option-active{
            box-shadow: ${theme.shadows[2]};
        }
        
        & > div{
            margin: 0;
            padding: 0;
            gap: .125rem;  
        }
                              
    }
    .rdw-dropdown-wrapper{
        height: 36px;
        margin: .15rem;
        padding: 0 .15rem;
        border: 1px solid ${theme.palette.divider};
        border-radius: ${theme.shape.borderRadius};
        background-color: ${theme.palette.background.paper};    
        
        &:hover{
            box-shadow: ${theme.shadows[1]};
        }
        &:active{
            box-shadow: ${theme.shadows[2]};
        } 
        &:focus{
            box-shadow: ${theme.shadows[2]};
            background-color: transparent;
        }        
              
    }
    
`);
const EditorActionbar = styled(Box)(({ theme }) => `
    padding: ${theme.spacing(1)} ${theme.spacing(2)};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: ${theme.spacing(1)};
    border-top: 1px solid ${theme.palette.divider};    
`);

type WysiwygBaseProps = {
    value?: string,
    onChange?: (html: string, editor: EditorState) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    actions?: React.ReactNode,
    actionsSx?: BoxProps['sx'],
}
export type WysiwygProps = Partial<EditorProps> & WysiwygBaseProps

const Wysiwyg = (props: WysiwygProps) => {
    const {
        value,
        onChange,
        onFocus,
        onBlur,
        actions,
        actionsSx,
        ...rest
    } = props;

    const [ editorState, setEditorState ] = useState<EditorState>(() => EditorState.createEmpty());
    const { formatBold } = useIcons();

    const editor: React.MutableRefObject<any> = React.useRef(null);
    // Icons: https://materialui.co/icons/
    const toolbar = {
        options: [
            'inline',
            'blockType',
            'textAlign',
            'list',
            'link',
            'embedded',
            'image',
            'remove',
            'history',
        ],
        inline: {
            bold: {
                icon: formatBold,
            },
        },
    };

    const setStateValueHandler = (val: string | undefined) => {
        const state = val && EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(val) as any));
        state && setEditorState(state);
    };
    const changeHandler = (editorState: EditorState) => {
        const html = convertToHTML(editorState.getCurrentContent());
        setEditorState(editorState);
        onChange && onChange(html, editorState);
    };

    const renderCustomButtons = useMemo(() => {

        return [
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                }}
                className="ui-wysiwyg-button"
            >
                my link
            </a>,
        ]
    }, []);

    useEffect(() => setStateValueHandler(value), []);

    return (
        <EditorWrapper>
            <Editor
                ref={editor}
                toolbar={merge(toolbar, defaultToolbar)}
                editorState={editorState}
                onEditorStateChange={changeHandler}
                onFocus={onFocus && onFocus}
                onBlur={onBlur && onBlur}
                toolbarCustomButtons={renderCustomButtons}
                wrapperClassName="ui-wysiwyg-wrapper"
                toolbarClassName="ui-wysiwyg-toolbar"
                editorClassName="ui-wysiwyg-editor"
                {...rest}
            />
            {actions && (
                <EditorActionbar
                    sx={actionsSx}
                >
                    {actions}
                </EditorActionbar>
            )}
        </EditorWrapper>
    );
};

export default Wysiwyg;
