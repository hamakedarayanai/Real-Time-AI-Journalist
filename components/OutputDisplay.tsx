
import React from 'react';
import type { AnalysisResult } from '../types';
import Narrative from './Narrative';
import AudioSummary from './AudioSummary';
import Infographic from './Infographic';
import KnowledgeGraph from './KnowledgeGraph';
import Sentiment from './Sentiment';
import SectionCard from './SectionCard';

interface OutputDisplayProps {
  result: AnalysisResult;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8">
      <SectionCard icon="happy-outline" title="Sentiment Analysis">
        <Sentiment sentiment={result.sentiment} />
      </SectionCard>
      
      <SectionCard icon="mic-outline" title="Audio Summary">
        <AudioSummary summaryText={result.audioSummary} />
      </SectionCard>

      <SectionCard icon="newspaper-outline" title="Synthesized Narrative">
        <Narrative text={result.narrative} />
      </SectionCard>

      <SectionCard icon="bar-chart-outline" title="Key Facts Infographic">
        <Infographic data={result.infographicData} />
      </SectionCard>

      <SectionCard icon="share-social-outline" title="Key Players & Relationships">
        <KnowledgeGraph data={result.knowledgeGraphData} />
      </SectionCard>
    </div>
  );
};

export default OutputDisplay;
