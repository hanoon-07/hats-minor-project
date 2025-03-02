import React, { useEffect, useState } from 'react'
import Dropdown from '../Dropdown'
import Button from '../Button';
import { Play } from 'lucide-react';
import Editor from '@monaco-editor/react'

import Editorsettings from './Editorsettings';
import { useDispatch, useSelector } from 'react-redux';
import { addResult, updateCode, updateSelectedLang } from '../../features/examwindow/examSlice';
import { changeStatus } from '../../features/coderun/codeRunSlice';
import { batchRun } from '../../utils/CodeRunner';
import { selectCodeValues, selectInputs, selectLangs, selectSourceCode } from '../../redux/examSelector';


const Codeeditor = ({disabled, defaultCode}) => {

    /*
        Editor props

        disabled - true -> only one language supported, pass the language throught lanaguage
        disabled - flase -> pass all languages throught languages
        theme -> atom-one-dark, leet-code, eye-killer
        defaultCode -> if any default code pass throuth this prop, (same for all languages -> may be update later)
        runAction -> when clicking run button, some action to perform may changed by redux
        fontSize -> fontSize may be changed by settings compnent (redux)

    */

    
    const values = useSelector(selectCodeValues);
    
    const [selectedLanguage, setSelectedLanguage] = useState(0);
    
    const dispatch = useDispatch();
    const {fontSize, theme} = useSelector((state) => state['editor-settings']);
    const runStatus = useSelector((state) => state['code-run'].isRunning);
    //const qSelected = useSelector((state) => state['exam-data'].selected);
    const sourceCode = useSelector(selectSourceCode);
    const inputs = useSelector(selectInputs);
    const languages = useSelector(selectLangs);
    // console.log(languages);

    async function runCode() {
        let lang = languages[selectedLanguage];
        if(lang == 'c++') lang = 'cpp';
        if(lang == 'c#') lang = 'csharp';

        const fileNames = new Map();
        fileNames.set('java', 'Main.java');
        fileNames.set('python', 'Main.py');
        fileNames.set('c', 'main.c');
        fileNames.set('csharp', 'Main.cs');
        fileNames.set('javascript', 'index.js');
        fileNames.set('cpp', 'main.cpp');

        const response = await batchRun(lang, inputs, sourceCode, fileNames.get(lang));

    
        dispatch(changeStatus(false));
        var stdErr  = [];
        var stdOut = [];
        response.map((item) => {stdErr.push(item.stderr); stdOut.push(item.stdout)})
        dispatch(addResult({stdErr: stdErr, stdOut: stdOut}));
    }

    const createCustomTheme = (monaco) => {
        monaco.editor.defineTheme('leet-code', {
            base: 'vs-dark', 
            inherit: true,   
            rules: [
                
                { token: 'comment', foreground: '5C824B', fontStyle: 'italic' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                

                
                { token: 'delimiter', foreground: 'D4D4D4' },
                { token: 'delimiter.bracket', foreground: 'D4D4D4' },
                { token: 'delimiter.parenthesis', foreground: 'D4D4D4' },
                { token: 'operator', foreground: 'FFFFFF' },

                { token: 'variable', foreground: '4EC9B0' },
                { token: 'variable.predefined', foreground: '4EC9B0' },
                { token: 'function', foreground: '4EC9B0' },
                { token: 'method', foreground: '4EC9B0' },
            ],
            colors: {
                
                'editor.background': '#262626',
                'editor.foreground': '#4EC9B0',
                'editorLineNumber.foreground': '#858585',
                'editorLineNumber.activeForeground': '#FFFFFF',
                'editor.selectionBackground': '#264F78',
                'editor.lineHighlightBackground': '#2D2D2D',
                'editorCursor.foreground': '#FFFFFF',
                'editorWhitespace.foreground': '#404040',
                'editorGutter.background': '#262626',  
            }
        });

        monaco.editor.defineTheme('atom-one-dark', {
            base: 'vs-dark', 
            inherit: true,   
            rules: [
                
                { token: 'comment', foreground: '718489', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'BE77DD' },
                { token: 'string', foreground: '86BC79' },
                { token: 'number', foreground: 'E5B568' },
                

                
                { token: 'delimiter', foreground: 'D4D4D4' },
                { token: 'delimiter.bracket', foreground: 'D4D4D4' },
                { token: 'delimiter.parenthesis', foreground: 'D4D4D4' },
                { token: 'operator', foreground: '4EC9B0' },

                { token: 'variable', foreground: 'E06B73' },
                { token: 'variable.predefined', foreground: 'E06B73' },
                { token: 'function', foreground: '4D98E1' },
                { token: 'method', foreground: '4D98E1' },
            ],
            colors: {
                
                'editor.background': '#23272E',
                'editor.foreground': '#E06B73',
                'editorLineNumber.foreground': '#858585',
                'editorLineNumber.activeForeground': '#FFFFFF',
                'editor.selectionBackground': '#264F78',
                'editor.lineHighlightBackground': '#2C313C',
                'editorCursor.foreground': '#FFFFFF',
                'editorWhitespace.foreground': '#404040',
                'editorGutter.background': '#23272E',  
            }
        });

        monaco.editor.defineTheme('leet-code-light', {
            base: 'vs', // Light base theme
            inherit: true,   
            rules: [
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' }, // Soft green for comments
                { token: 'keyword', foreground: '0000FF' }, // Bright blue for keywords
                { token: 'string', foreground: 'A31515' }, // Deep red for strings
                { token: 'number', foreground: '09885A' }, // Greenish-blue for numbers
                { token: 'delimiter', foreground: '000000' }, // Black for delimiters
                { token: 'delimiter.bracket', foreground: '000000' },
                { token: 'delimiter.parenthesis', foreground: '000000' },
                { token: 'operator', foreground: '000000' }, // Black for operators
                { token: 'variable', foreground: '267F99' }, // Blue-green for variables
                { token: 'variable.predefined', foreground: '267F99' },
                { token: 'function', foreground: '795E26' }, // Brown for functions
                { token: 'method', foreground: '795E26' },
            ],
            colors: {
                'editor.background': '#FFFFFF', // White background
                'editor.foreground': '#000000', // Black text
                'editorLineNumber.foreground': '#BFBFBF', // Light gray for line numbers
                'editorLineNumber.activeForeground': '#000000', // Black for active line number
                'editor.selectionBackground': '#ADD6FF', // Light blue for selection
                'editor.lineHighlightBackground': '#F3F3F3', // Light gray for line highlight
                'editorCursor.foreground': '#000000', // Black cursor
                'editorWhitespace.foreground': '#D3D3D3', // Light gray for whitespace
                'editorGutter.background': '#FFFFFF', // White gutter background
            }
        });
    };


    const handleEditorBeforeMount = (monaco) => {
        createCustomTheme(monaco);
    };

    
    return (
        <div className='rounded-[4px] h-[100%]'>
            <div className='head w-[100%] items-center h-11 flex flex-row justify-between px-2 rounded-t-[5px] bg-secondaryGray' >
                <Dropdown action={(index) => {setSelectedLanguage(index); dispatch(updateSelectedLang(index))}} selected={languages?languages[selectedLanguage]: languages[0]} disabled={disabled ? disabled: false} items={languages?languages: ['java']}/>
                
                <div className='flex flex-row gap-2'> 
                    <Editorsettings />
                    <Button  action={() => {if(!runStatus) {dispatch(changeStatus(true)); runCode()}}} iconStyle={{size: 14, className: ' translate-y-0 '}} Icon={Play} label={runStatus?"running": "run"} disabled={false} buttonClass={'text-black bg-[#A8FF53] hover:bg-[#BEFF7F]'}/>
                </div>
            </div>

            <div className=' p-[4px] pl-[10px] w-[100%]  bg-darkGray rounded-b-[4px] h-[calc(100%-2.75rem)]'  
            >

                <Editor value={values[selectedLanguage]|| ''} onChange={(value) => {dispatch(updateCode({value:value, language:languages[selectedLanguage]}))}} beforeMount={handleEditorBeforeMount} height="100%" width="100%" theme={theme} defaultValue={values[selectedLanguage] || defaultCode}  defaultLanguage={!disabled?languages[selectedLanguage]:language}  options={{ 
                    fontSize: fontSize, 
                    suggestOnTriggerCharacters: false, 
                    quickSuggestions: false, 
                    parameterHints: { enabled: false }, 
                    lineNumbersMinChars: 1, 
                }}/>
                    
            </div> 
            
        </div>
    )
}

export default Codeeditor;
