import { useState, useCallback, useRef } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

interface AnalysisResult {
  sentiment: {
    label: string;
    score: number;
  };
  tone: string;
  engagementScore: number;
  suggestions: string[];
  hashtags: string[];
}

export const usePostAnalyzer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const sentimentAnalyzer = useRef<any>(null);
  const classifier = useRef<any>(null);

  const initializeModels = useCallback(async () => {
    if (sentimentAnalyzer.current) return;
    
    try {
      console.log('Loading AI models...');
      // Load sentiment analysis model
      sentimentAnalyzer.current = await pipeline(
        'sentiment-analysis',
        'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
        { device: 'wasm' }
      );
      
      // Load zero-shot classification for content categorization
      classifier.current = await pipeline(
        'zero-shot-classification',
        'Xenova/distilbert-base-uncased-mnli',
        { device: 'wasm' }
      );
      
      setModelReady(true);
      console.log('AI models loaded successfully');
    } catch (error) {
      console.error('Error loading models:', error);
      throw error;
    }
  }, []);

  const analyzePost = useCallback(async (text: string): Promise<AnalysisResult> => {
    if (!text.trim()) {
      throw new Error('Post text is empty');
    }

    setIsLoading(true);

    try {
      // Initialize models if not already done
      if (!sentimentAnalyzer.current) {
        await initializeModels();
      }

      // Analyze sentiment
      const sentimentResult = await sentimentAnalyzer.current(text);
      const sentiment = sentimentResult[0];

      // Classify content type
      const contentLabels = [
        'professional advice',
        'personal achievement',
        'industry insights',
        'thought leadership',
        'networking',
        'career development'
      ];
      
      const classification = await classifier.current(text, contentLabels);
      const primaryCategory = classification.labels[0];

      // Calculate engagement score based on various factors
      const wordCount = text.trim().split(/\s+/).length;
      const hasQuestion = text.includes('?');
      const hasHashtag = text.includes('#');
      const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(text);
      
      let engagementScore = 50;
      
      // Sentiment boost
      if (sentiment.label === 'POSITIVE') {
        engagementScore += sentiment.score * 20;
      }
      
      // Word count optimal range (50-150 words)
      if (wordCount >= 50 && wordCount <= 150) {
        engagementScore += 15;
      } else if (wordCount > 150 && wordCount <= 200) {
        engagementScore += 5;
      }
      
      // Engagement features
      if (hasQuestion) engagementScore += 10;
      if (hasHashtag) engagementScore += 5;
      if (hasEmoji) engagementScore += 5;
      
      engagementScore = Math.min(95, Math.max(30, engagementScore));

      // Generate suggestions
      const suggestions: string[] = [];
      
      if (!hasQuestion) {
        suggestions.push('Add a question to encourage comments');
      }
      if (wordCount < 50) {
        suggestions.push('Expand your post with more details');
      }
      if (wordCount > 200) {
        suggestions.push('Consider making your post more concise');
      }
      if (!hasHashtag) {
        suggestions.push('Include 3-5 relevant hashtags');
      }
      if (sentiment.label === 'NEGATIVE' && sentiment.score > 0.8) {
        suggestions.push('Consider a more positive or neutral tone');
      }

      // Generate hashtag suggestions based on category
      const hashtagMap: Record<string, string[]> = {
        'professional advice': ['#CareerAdvice', '#ProfessionalDevelopment', '#Leadership', '#CareerGrowth'],
        'personal achievement': ['#MilestoneAchievement', '#CareerSuccess', '#ProudMoment', '#Achievement'],
        'industry insights': ['#IndustryTrends', '#Innovation', '#BusinessInsights', '#FutureOfWork'],
        'thought leadership': ['#ThoughtLeadership', '#Innovation', '#Leadership', '#Strategy'],
        'networking': ['#Networking', '#ProfessionalNetwork', '#ConnectionsMatter', '#Community'],
        'career development': ['#CareerGrowth', '#ProfessionalDevelopment', '#SkillBuilding', '#Learning']
      };

      const hashtags = hashtagMap[primaryCategory] || ['#LinkedIn', '#Professional', '#Career', '#Business'];

      // Determine tone
      let tone = 'Professional';
      if (sentiment.label === 'POSITIVE' && sentiment.score > 0.9) {
        tone = 'Enthusiastic';
      } else if (sentiment.label === 'POSITIVE') {
        tone = 'Optimistic';
      } else if (sentiment.label === 'NEGATIVE') {
        tone = 'Critical';
      }

      return {
        sentiment,
        tone,
        engagementScore,
        suggestions,
        hashtags
      };
    } catch (error) {
      console.error('Error analyzing post:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [initializeModels]);

  return {
    analyzePost,
    isLoading,
    modelReady,
    initializeModels
  };
};
