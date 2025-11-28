import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, onRun, output }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <Editor
                    height="100%"
                    defaultLanguage="python"
                    theme="vs-dark"
                    value={code}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
            <div className="h-1/3 bg-black text-green-400 p-4 font-mono overflow-y-auto border-t border-gray-700 flex flex-col">
                <div className="flex justify-between items-center mb-2 shrink-0">
                    <span className="text-gray-500 text-sm">Output Terminal</span>
                    <button
                        onClick={onRun}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm font-bold transition-colors"
                    >
                        Run Code ▶
                    </button>
                </div>
                <pre className="whitespace-pre-wrap flex-1 overflow-auto font-mono text-sm">{output || 'Ready to run...'}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;
