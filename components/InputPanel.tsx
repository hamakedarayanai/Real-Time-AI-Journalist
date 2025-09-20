
import React, { useState } from 'react';

interface InputPanelProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const sampleText = `San Francisco, CA - In a landmark announcement, tech giant QuantumLeap today unveiled "Synapse," a revolutionary neural interface that promises to merge human consciousness with artificial intelligence. The device, a sleek, non-invasive headband, reportedly translates thoughts into digital commands with 99% accuracy. CEO Dr. Aris Thorne stated, "Synapse is not just a new product; it's the next step in human evolution." The technology, developed in partnership with neuroscientists from the Global Brain Institute, has raised both excitement and ethical concerns. Dr. Lena Petrova, a leading AI ethicist, warns, "We are stepping into uncharted territory. The potential for misuse is as vast as the potential for good." QuantumLeap's stock surged 40% on the news, while competitors like MindBridge Inc. saw a significant dip. The company plans to launch a developer kit by the end of the year, with a consumer version slated for 2027.`;

const InputPanel: React.FC<InputPanelProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState<string>('');

  const handleAnalyzeClick = () => {
    onAnalyze(text);
  };
  
  const handleUseSample = () => {
      setText(sampleText);
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-slate-200 flex items-center">
        <ion-icon name="document-text-outline" class="mr-2 text-2xl text-cyan-400"></ion-icon>
        News Source
      </h2>
      <p className="text-slate-400 mb-4 text-sm">Paste the content of a news article below to begin the analysis.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste news article here..."
        className="w-full flex-grow bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200 resize-none"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
            onClick={handleUseSample}
            disabled={isLoading}
            className="w-full sm:w-auto flex-shrink-0 bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-md hover:bg-slate-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Use Sample Text
        </button>
        <button
          onClick={handleAnalyzeClick}
          disabled={isLoading || !text.trim()}
          className="w-full sm:w-auto flex-grow bg-cyan-600 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-500 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
             <>
               <ion-icon name="analytics-outline" class="mr-2 text-xl"></ion-icon>
               Analyze
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
