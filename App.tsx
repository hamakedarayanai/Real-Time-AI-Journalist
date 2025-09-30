
import React, { useState, useCallback } from 'react';
import { analyzeNews, fetchArticleContent } from './services/geminiService';
import type { AnalysisResult } from './types';
import InputPanel from './components/InputPanel';
import Header from './components/Header';
import OutputDisplay from './components/OutputDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [text, setText] = useState<string>('');

  const handleFetchAndPaste = useCallback(async (url: string) => {
    if (!url.trim()) {
      setError('Please enter a URL to fetch.');
      return;
    }
    setIsFetching(true);
    setError(null);
    setAnalysisResult(null);
    setText('');

    try {
      const content = await fetchArticleContent(url);
      setText(content);
    } catch (err) {
      console.error('Fetch failed:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching the URL.');
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter or fetch some news text to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeNews(text);
      setAnalysisResult(result);
    // Fix: Add curly braces to the catch block to correctly scope the error variable.
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <InputPanel
            text={text}
            onTextChange={setText}
            onAnalyze={handleAnalyze}
            onFetch={handleFetchAndPaste}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>
        <div className="lg:col-span-8">
          {(isLoading || isFetching) && <LoadingSpinner isFetching={isFetching} />}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex items-center">
                <ion-icon name="alert-circle" class="text-2xl mr-3"></ion-icon>
                <span>{error}</span>
            </div>
          )}
          {analysisResult && !isLoading && !isFetching && <OutputDisplay result={analysisResult} />}
          {!isLoading && !isFetching && !error && !analysisResult && (
            <div className="flex flex-col items-center justify-center h-full bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
              <ion-icon name="newspaper-outline" class="text-7xl text-slate-600 mb-4"></ion-icon>
              <h2 className="text-2xl font-bold text-slate-400">Your AI-Generated News Report</h2>
              <p className="text-slate-500 mt-2">
                Paste a news article on the left, or provide a URL, and click "Analyze" to generate a multi-modal summary.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
