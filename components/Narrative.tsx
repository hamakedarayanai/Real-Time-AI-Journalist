
import React from 'react';

interface NarrativeProps {
  text: string;
}

const Narrative: React.FC<NarrativeProps> = ({ text }) => {
  return (
    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
      {text}
    </p>
  );
};

export default Narrative;
