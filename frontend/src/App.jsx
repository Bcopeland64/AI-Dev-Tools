import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CodeEditor from './components/CodeEditor';
import { fetchCurriculum, runCode } from './api';

function App() {
  const [curriculum, setCurriculum] = useState({ beginner: [], intermediate: [], advanced: [] });
  const [currentLesson, setCurrentLesson] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);

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
    setCode(lesson.example || '');
    setOutput('');
  };

  const handleRun = async () => {
    setOutput('Running...');
    try {
      const result = await runCode(code);
      if (result.error) {
        setOutput(`Error:\n${result.error}`);
      } else {
        setOutput(result.output);
      }
    } catch (error) {
      setOutput('Failed to execute code.');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;

  const Navigation = (
    <div className="space-y-4">
      {Object.entries(curriculum).map(([level, lessons]) => (
        lessons.length > 0 && (
          <div key={level}>
            <h3 className="text-gray-400 uppercase text-xs font-bold mb-2">{level}</h3>
            <ul className="space-y-1">
              {lessons.map(lesson => (
                <li key={lesson.id}>
                  <button
                    onClick={() => selectLesson(lesson)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${currentLesson?.id === lesson.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  >
                    {lesson.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );

  const Hints = currentLesson ? (
    <div>
      <h2 className="text-xl font-bold mb-4">{currentLesson.title}</h2>
      <p className="text-gray-300 mb-6 leading-relaxed">{currentLesson.content}</p>

      {currentLesson.hints && currentLesson.hints.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded p-4">
          <h3 className="text-yellow-500 font-bold mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            {currentLesson.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : <div className="text-gray-500 italic">Select a lesson to see details.</div>;

  return (
    <Layout
      left={Navigation}
      middle={<CodeEditor code={code} onChange={setCode} onRun={handleRun} output={output} />}
      right={Hints}
    />
  );
}

export default App;
