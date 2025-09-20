
import React from 'react';
import type { Sentiment as SentimentType } from '../types';

interface SentimentProps {
  sentiment: SentimentType;
}

const sentimentConfig = {
  Positive: {
    bgColor: 'bg-green-900/50',
    textColor: 'text-green-300',
    borderColor: 'border-green-700',
    icon: 'trending-up-outline',
    iconColor: 'text-green-400'
  },
  Negative: {
    bgColor: 'bg-red-900/50',
    textColor: 'text-red-300',
    borderColor: 'border-red-700',
    icon: 'trending-down-outline',
    iconColor: 'text-red-400'
  },
  Neutral: {
    bgColor: 'bg-slate-700/50',
    textColor: 'text-slate-300',
    borderColor: 'border-slate-600',
    icon: 'remove-outline',
    iconColor: 'text-slate-400'
  }
};

const Sentiment: React.FC<SentimentProps> = ({ sentiment }) => {
  const config = sentimentConfig[sentiment];
  
  return (
    <div className={`inline-flex items-center p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <ion-icon name={config.icon} class={`text-3xl mr-3 ${config.iconColor}`}></ion-icon>
      <span className={`text-lg font-semibold ${config.textColor}`}>{sentiment}</span>
    </div>
  );
};

export default Sentiment;
