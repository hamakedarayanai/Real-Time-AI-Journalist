
import React, { useState } from 'react';

interface NarrativeProps {
  text: string;
}

const Narrative: React.FC<NarrativeProps> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute top-0 right-0 bg-slate-700/50 backdrop-blur-sm text-slate-300 p-2 rounded-bl-lg rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100"
                aria-label="Copy narrative"
            >
                <ion-icon name={copied ? "checkmark-circle" : "copy-outline"} class={`text-lg ${copied ? 'text-green-400' : ''}`}></ion-icon>
            </button>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {text}
            </p>
        </div>
    );
};

export default Narrative;