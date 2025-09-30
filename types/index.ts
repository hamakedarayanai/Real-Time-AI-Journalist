
// Fix: Import React's types to make them available for the JSX namespace augmentation.
import 'react';

// Fix: Add a global declaration for ion-icon to allow its use in JSX. This resolves TypeScript errors across multiple components.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string; class?: string; }, HTMLElement>;
    }
  }
}

export interface InfographicData {
  title: string;
  data: {
    label: string;
    value: number;
  }[];
}

export interface KnowledgeGraphNode {
  id: string;
  group: string;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  relationship: string;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeGraphNode[];
  links: KnowledgeGraphLink[];
}

export type Sentiment = 'Positive' | 'Negative' | 'Neutral';

export interface AnalysisResult {
  narrative: string;
  audioSummary: string;
  sentiment: Sentiment;
  infographicData: InfographicData;
  knowledgeGraphData: KnowledgeGraphData;
}
