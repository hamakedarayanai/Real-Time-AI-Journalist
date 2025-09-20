
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    narrative: {
      type: Type.STRING,
      description: "A synthesized, comprehensive narrative of the news story, written in an engaging journalistic style.",
    },
    audioSummary: {
      type: Type.STRING,
      description: "A concise, 2-3 sentence summary suitable for a text-to-speech audio clip.",
    },
    sentiment: {
      type: Type.STRING,
      description: "The overall sentiment of the article.",
      enum: ['Positive', 'Negative', 'Neutral'],
    },
    infographicData: {
      type: Type.OBJECT,
      description: "Data for an infographic. Extract up to 5 key numerical facts or statistics. If no numerical data is available, create representative data based on the text's theme.",
      properties: {
        title: {
          type: Type.STRING,
          description: "A descriptive title for the infographic chart."
        },
        data: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              value: { type: Type.NUMBER }
            },
            required: ['label', 'value']
          }
        }
      },
      required: ['title', 'data']
    },
    knowledgeGraphData: {
      type: Type.OBJECT,
      description: "A knowledge graph identifying key entities (people, organizations, locations) and their relationships.",
      properties: {
        nodes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "The name of the entity." },
              group: { type: Type.STRING, description: "The type of entity (e.g., person, organization, location)." }
            },
            required: ['id', 'group']
          }
        },
        links: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              source: { type: Type.STRING, description: "The source node ID." },
              target: { type: Type.STRING, description: "The target node ID." },
              relationship: { type: Type.STRING, description: "The relationship between the nodes." }
            },
            required: ['source', 'target', 'relationship']
          }
        }
      },
      required: ['nodes', 'links']
    }
  },
  required: ['narrative', 'audioSummary', 'sentiment', 'infographicData', 'knowledgeGraphData']
};

export async function analyzeNews(rawText: string): Promise<AnalysisResult> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are a world-class AI journalist. Analyze the following news text and generate a comprehensive, multi-modal report in a single JSON object.

The news text is:
---
${rawText}
---

Based on the text, provide the following:

1.  **narrative**: A synthesized, comprehensive narrative of the news story, written in an engaging journalistic style.
2.  **audioSummary**: A concise, 2-3 sentence summary suitable for a text-to-speech audio clip.
3.  **sentiment**: The overall sentiment of the article. Must be one of: "Positive", "Negative", or "Neutral".
4.  **infographicData**: Data for an infographic. Extract up to 5 key numerical facts or statistics. If no numerical data is available, create representative data based on the text's theme. The structure should be: { "title": "...", "data": [ { "label": "...", "value": ... } ] }.
5.  **knowledgeGraphData**: A knowledge graph identifying key entities (people, organizations, locations) and their relationships. The structure should be: { "nodes": [ { "id": "...", "group": "person/organization/location" } ], "links": [ { "source": "...", "target": "...", "relationship": "..." } ] }.

Return ONLY the JSON object that strictly adheres to the provided schema. Do not include any other text, explanations, or markdown formatting.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);
    
    // Basic validation to ensure the structure is what we expect
    if (!result.narrative || !result.knowledgeGraphData) {
        throw new Error("Invalid data structure received from API.");
    }
    
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze news. The AI model may have returned an invalid response.");
  }
}
