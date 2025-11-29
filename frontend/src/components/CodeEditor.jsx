
import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, onRun, output, mode }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            background: 'var(--color-bg-primary)'
        }}>
            {/* Editor Header */}
            <div style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                background: 'var(--color-bg-secondary)',
                borderBottom: '1px solid var(--color-border-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: mode === 'exercise' ? 'var(--color-accent-secondary)' : 'var(--color-accent-success)',
                        boxShadow: `0 0 8px ${mode === 'exercise' ? 'var(--color-accent-secondary)' : 'var(--color-accent-success)'} `
                    }}></span>
                    {mode === 'exercise' ? 'Challenge Editor' : 'Python Editor'}
                </div>
                <button
                    onClick={onRun}
                    className={mode === 'exercise' ? 'btn-accent' : 'btn-success'}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        fontSize: '0.875rem',
                        padding: 'var(--spacing-sm) var(--spacing-lg)'
                    }}
                >
                    <span>{mode === 'exercise' ? '🚀' : '▶'}</span>
                    {mode === 'exercise' ? 'Submit Answer' : 'Run Code'}
                </button>
            </div>

            {/* Monaco Editor */}
            <div style={{ flex: '1 1 60%', minHeight: 0 }}>
                <Editor
                    height="100%"
                    defaultLanguage="python"
                    theme="vs-dark"
                    value={code}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: 'var(--font-mono)',
                        scrollBeyondLastLine: false,
                        lineNumbers: 'on',
                        renderLineHighlight: 'all',
                        cursorBlinking: 'smooth',
                        smoothScrolling: true,
                        padding: { top: 16, bottom: 16 },
                        bracketPairColorization: {
                            enabled: true
                        }
                    }}
                />
            </div>

            {/* Output Terminal */}
            <div style={{
                flex: '0 0 40%',
                background: '#0a0e14',
                borderTop: '1px solid var(--color-border-primary)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Terminal Header */}
                <div style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    background: 'rgba(16, 20, 25, 0.8)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--color-text-tertiary)'
                }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#ff5f56'
                        }}></span>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#ffbd2e'
                        }}></span>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#27c93f'
                        }}></span>
                    </div>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Output Terminal
                    </span>
                </div>

                {/* Terminal Content */}
                <div style={{
                    flex: 1,
                    padding: 'var(--spacing-lg)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    color: '#00ff9f',
                    overflowY: 'auto',
                    lineHeight: '1.6'
                }}>
                    <pre style={{
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                    }}>
                        {output || (
                            <span style={{ color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                                Ready to execute... Click "Run Code" to see output here.
                            </span>
                        )}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
