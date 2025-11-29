import React from 'react';

const ExercisePanel = ({ lesson, validationResult, onNext }) => {
    if (!lesson || !lesson.exercise) return null;

    const { exercise } = lesson;

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-sm)'
                }}>
                    🎯 Challenge: {lesson.title}
                </h3>
                <p style={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.7',
                    fontSize: '0.9375rem'
                }}>
                    {exercise.instruction}
                </p>
            </div>

            {/* Validation Results */}
            {validationResult && (
                <div className={`hint-card ${validationResult.success ? 'success' : 'error'}`} style={{
                    borderColor: validationResult.success ? 'var(--color-accent-success)' : 'var(--color-accent-error)',
                    background: validationResult.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                }}>
                    <h4 className="hint-card-title" style={{
                        color: validationResult.success ? 'var(--color-accent-success)' : 'var(--color-accent-error)'
                    }}>
                        {validationResult.success ? '🎉 Success!' : '❌ Keep Trying'}
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-md)' }}>{validationResult.message}</p>

                    {validationResult.testResults && (
                        <ul className="hint-list">
                            {validationResult.testResults.map((test, index) => (
                                <li key={index} className="hint-item" style={{
                                    paddingLeft: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)'
                                }}>
                                    <span style={{
                                        color: test.passed ? 'var(--color-accent-success)' : 'var(--color-accent-error)'
                                    }}>
                                        {test.passed ? '✓' : '✗'}
                                    </span>
                                    <span style={{
                                        color: test.passed ? 'var(--color-text-secondary)' : 'var(--color-text-muted)'
                                    }}>
                                        {test.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {validationResult.success && onNext && (
                        <button
                            onClick={onNext}
                            className="btn-primary"
                            style={{ marginTop: 'var(--spacing-md)', width: '100%' }}
                        >
                            Next Lesson →
                        </button>
                    )}
                </div>
            )}

            {/* Hints */}
            {exercise.hints && exercise.hints.length > 0 && (
                <div className="hint-card" style={{ marginTop: 'var(--spacing-lg)' }}>
                    <h4 className="hint-card-title">
                        💡 Hints
                    </h4>
                    <ul className="hint-list">
                        {exercise.hints.map((hint, index) => (
                            <li key={index} className="hint-item">{hint}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExercisePanel;
