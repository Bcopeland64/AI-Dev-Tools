import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CodeEditor from './components/CodeEditor';
import ExercisePanel from './components/ExercisePanel';
import { fetchCurriculum, runCode, validateCode } from './api';
import './App.css';

function App() {
  const [curriculum, setCurriculum] = useState({ beginner: [], intermediate: [], advanced: [] });
  const [currentLesson, setCurrentLesson] = useState(null);
  const [mode, setMode] = useState('explanation'); // explanation, example, exercise
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [validationResult, setValidationResult] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCurriculum();
        setCurriculum(data);
        // Default to first beginner lesson
        if (data.beginner && data.beginner.length > 0) {
          selectLesson(data.beginner[0]);
        }
      } catch (error) {
        console.error("Failed to load curriculum", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const selectLesson = (lesson) => {
    setCurrentLesson(lesson);
    setMode('explanation');
    setCode(lesson.example || '');
    setOutput('');
    setValidationResult(null);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setOutput('');
    setValidationResult(null);

    if (newMode === 'explanation' || newMode === 'example') {
      setCode(currentLesson.example || '');
    } else if (newMode === 'exercise') {
      setCode(currentLesson.exercise?.starterCode || '');
    }
  };

  const handleRun = async () => {
    if (mode === 'exercise') {
      // Validate exercise
      setOutput('⏳ Validating your solution...');
      try {
        const result = await validateCode(code, currentLesson.exercise.testCases);
        setValidationResult(result);
        setOutput(result.output || (result.success ? '✅ All tests passed!' : '❌ Some tests failed. Check the results.'));

        if (result.success) {
          const newCompleted = new Set(completedLessons);
          newCompleted.add(currentLesson.id);
          setCompletedLessons(newCompleted);
        }
      } catch (error) {
        setOutput('❌ Validation failed. Please try again.');
      }
    } else {
      // Just run code
      setOutput('⏳ Running your code...');
      try {
        const result = await runCode(code);
        if (result.error) {
          setOutput(`❌ Error:\n${result.error}`);
        } else {
          setOutput(result.output || '✅ Code executed successfully (no output)');
        }
      } catch (error) {
        setOutput('❌ Failed to execute code. Please try again.');
      }
    }
  };

  const handleNextLesson = () => {
    // Logic to find next lesson would go here
    // For now, just stay on current or we could implement a finder
    alert("Great job! Select the next lesson from the menu.");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading Python Tutor...</div>
      </div>
    );
  }

  const Navigation = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      {Object.entries(curriculum).map(([level, lessons]) => (
        lessons.length > 0 && (
          <div key={level} className="lesson-group">
            <h3 className="lesson-group-title">{level}</h3>
            <ul className="lesson-list">
              {lessons.map(lesson => (
                <li key={lesson.id}>
                  <button
                    onClick={() => selectLesson(lesson)}
                    className={`lesson-button ${currentLesson?.id === lesson.id ? 'active' : ''}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{lesson.title}</span>
                    {completedLessons.has(lesson.id) && <span style={{ color: 'var(--color-accent-success)' }}>✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );

  const GuideContent = currentLesson ? (
    <div className="animate-fade-in">
      {/* Mode Tabs */}
      <div style={{
        display: 'flex',
        gap: '2px',
        background: 'var(--color-bg-tertiary)',
        padding: '2px',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        {['explanation', 'example', 'exercise'].map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            style={{
              flex: 1,
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              background: mode === m ? 'var(--color-bg-card)' : 'transparent',
              color: mode === m ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: mode === m ? '600' : '500'
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === 'explanation' && (
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>📖 Concept</h3>
          <p style={{ lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
            {currentLesson.explanation}
          </p>
          <button
            onClick={() => handleModeChange('example')}
            className="btn-primary"
            style={{ marginTop: 'var(--spacing-lg)', width: '100%' }}
          >
            See Example →
          </button>
        </div>
      )}

      {mode === 'example' && (
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>👀 Example</h3>
          <p style={{ lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            Review the code in the editor to understand how it works. Click "Run Code" to see the output.
          </p>
          <button
            onClick={() => handleModeChange('exercise')}
            className="btn-accent"
            style={{ width: '100%' }}
          >
            Start Challenge →
          </button>
        </div>
      )}

      {mode === 'exercise' && (
        <ExercisePanel
          lesson={currentLesson}
          validationResult={validationResult}
          onNext={handleNextLesson}
        />
      )}
    </div>
  ) : (
    <div className="empty-state">
      <div className="empty-state-icon">📚</div>
      <p>Select a lesson from the curriculum to get started</p>
    </div>
  );

  return (
    <Layout
      left={Navigation}
      middle={
        <CodeEditor
          code={code}
          onChange={setCode}
          onRun={handleRun}
          output={output}
          mode={mode}
        />
      }
      right={GuideContent}
    />
  );
}

export default App;
