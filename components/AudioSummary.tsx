
import React, { useState, useEffect, useCallback } from 'react';

interface AudioSummaryProps {
  summaryText: string;
}

const AudioSummary: React.FC<AudioSummaryProps> = ({ summaryText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const synth = window.speechSynthesis;

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
      <p className="text-slate-300 italic">"{summaryText}"</p>
      <div className="flex items-center space-x-2">
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold p-3 rounded-full transition duration-200 flex items-center justify-center"
            aria-label={isPaused ? "Resume" : "Play"}
          >
            <ion-icon name={isPaused ? "play" : "play"} class="text-xl"></ion-icon>
          </button>
        )}
        {isPlaying && (
          <button
            onClick={handlePause}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold p-3 rounded-full transition duration-200 flex items-center justify-center"
            aria-label="Pause"
          >
            <ion-icon name="pause" class="text-xl"></ion-icon>
          </button>
        )}
        <button
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-full transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          aria-label="Stop"
        >
          <ion-icon name="stop" class="text-xl"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default AudioSummary;
