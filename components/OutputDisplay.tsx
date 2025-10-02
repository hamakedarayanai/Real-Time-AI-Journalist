
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
    
  const sections = [
    { id: 'sentiment', icon: 'happy-outline', title: 'Sentiment Analysis', component: <Sentiment sentiment={result.sentiment} /> },
    { id: 'audio', icon: 'mic-outline', title: 'Audio Summary', component: <AudioSummary summaryText={result.audioSummary} /> },
    { id: 'narrative', icon: 'newspaper-outline', title: 'Synthesized Narrative', component: <Narrative text={result.narrative} /> },
    { id: 'infographic', icon: 'bar-chart-outline', title: 'Key Facts Infographic', component: <Infographic data={result.infographicData} /> },
    { id: 'graph', icon: 'share-social-outline', title: 'Key Players & Relationships', component: <KnowledgeGraph data={result.knowledgeGraphData} /> },
  ];

  return (
    <div className="space-y-8">
       {sections.map((section, index) => (
         <div 
           key={section.id} 
           className="animate-fadeIn opacity-0" 
           style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
         >
          <SectionCard icon={section.icon} title={section.title}>
            {section.component}
          </SectionCard>
         </div>
       ))}
    </div>
  );
};

export default OutputDisplay;