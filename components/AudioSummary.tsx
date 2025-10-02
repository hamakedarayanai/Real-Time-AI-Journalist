
import React, { useState, useEffect, useCallback } from 'react';

interface AudioSummaryProps {
  summaryText: string;
}

const AudioSummary: React.FC<AudioSummaryProps> = ({ summaryText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const synth = window.speechSynthesis;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlay = useCallback(() => {
    if (!synth) return;

    if (isPaused) {
      synth.resume();
    } else {
      const utterance = new SpeechSynthesisUtterance(summaryText);
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsPlaying(false);
        setIsPaused(false);
      }
      synth.speak(utterance);
    }
    setIsPlaying(true);
    setIsPaused(false);
  }, [summaryText, isPaused, synth]);

  const handlePause = useCallback(() => {
    if (synth) {
      synth.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, [synth]);

  const handleStop = useCallback(() => {
    if (synth) {
      synth.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [synth]);

  useEffect(() => {
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  return (
    <div className="space-y-4">
      <div className="relative group">
        <button
            onClick={handleCopy}
            className="absolute top-0 right-0 bg-slate-700/50 backdrop-blur-sm text-slate-300 p-2 rounded-bl-lg rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100"
            aria-label="Copy summary text"
        >
            <ion-icon name={copied ? "checkmark-circle" : "copy-outline"} class={`text-lg ${copied ? 'text-green-400' : ''}`}></ion-icon>
        </button>
        <p className="text-slate-300 italic pr-12">"{summaryText}"</p>
      </div>

      <div className="flex items-center space-x-2">
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold p-3 rounded-full transition duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800"
            title={isPaused ? "Resume" : "Play"}
            aria-label={isPaused ? "Resume" : "Play"}
          >
            <ion-icon name={isPaused ? "play" : "play"} class="text-xl"></ion-icon>
          </button>
        )}
        {isPlaying && (
          <button
            onClick={handlePause}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold p-3 rounded-full transition duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-800"
            title="Pause"
            aria-label="Pause"
          >
            <ion-icon name="pause" class="text-xl"></ion-icon>
          </button>
        )}
        <button
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-full transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-600 focus-visible:ring-offset-slate-800"
          title="Stop"
          aria-label="Stop"
        >
          <ion-icon name="stop" class="text-xl"></ion-icon>
        </button>

        {isPlaying && (
            <div className="flex items-end space-x-1 h-6">
                <span className="w-1 h-2 bg-cyan-400 animate-pulse-fast" style={{animationDelay: '0s', animationDuration: '0.8s'}}></span>
                <span className="w-1 h-4 bg-cyan-400 animate-pulse-fast" style={{animationDelay: '0.2s', animationDuration: '1s'}}></span>
                <span className="w-1 h-3 bg-cyan-400 animate-pulse-fast" style={{animationDelay: '0.4s', animationDuration: '0.9s'}}></span>
            </div>
        )}
      </div>
    </div>
  );
};

export default AudioSummary;