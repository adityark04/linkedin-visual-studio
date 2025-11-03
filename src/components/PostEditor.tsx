import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Hash, CheckCircle2, Brain, Loader2 } from "lucide-react";
import { usePostAnalyzer } from "@/hooks/usePostAnalyzer";
import { toast } from "sonner";

export const PostEditor = () => {
  const [post, setPost] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const { analyzePost, isLoading, modelReady, initializeModels } = usePostAnalyzer();

  useEffect(() => {
    // Pre-load models on component mount
    initializeModels().catch((error) => {
      console.error('Failed to load AI models:', error);
      toast.error('Failed to load AI models. Please refresh the page.');
    });
  }, [initializeModels]);

  const handleAnalyze = async () => {
    if (!post.trim()) return;
    
    try {
      toast.info('Analyzing your post with AI...');
      const result = await analyzePost(post);
      setAnalysis(result);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze post. Please try again.');
    }
  };

  const wordCount = post.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Editor */}
      <Card className="lg:col-span-2 shadow-elevated animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Craft Your LinkedIn Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Share your professional insights, achievements, or thoughts..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="min-h-[280px] resize-none text-base leading-relaxed"
          />
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground space-y-1">
              <div>{wordCount} words · {post.length} characters</div>
              {!modelReady && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading AI models...
                </div>
              )}
            </div>
            <Button 
              onClick={handleAnalyze}
              disabled={!post.trim() || isLoading || !modelReady}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Insights Panel */}
      <div className="space-y-6 animate-slide-up">
        {/* AI Analysis Results */}
        {analysis && (
          <Card className="shadow-soft hover:shadow-elevated transition-shadow border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="h-4 w-4 text-primary" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Sentiment</div>
                <Badge variant={analysis.sentiment.label === 'POSITIVE' ? 'default' : 'secondary'}>
                  {analysis.sentiment.label} ({Math.round(analysis.sentiment.score * 100)}%)
                </Badge>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Tone</div>
                <div className="text-sm font-medium">{analysis.tone}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Engagement Score */}
        <Card className="shadow-soft hover:shadow-elevated transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-success" />
              Engagement Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {analysis ? Math.round(analysis.engagementScore) : post.length > 0 ? "..." : "--"}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {!analysis && post.length === 0 
                ? "Start writing to see predictions"
                : !analysis
                ? "Click 'Analyze with AI' for score"
                : analysis.engagementScore > 70 
                ? "Excellent potential!" 
                : "Good! Check suggestions below"}
            </p>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="shadow-soft hover:shadow-elevated transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {analysis ? 'AI Suggestions' : 'Style Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis ? (
              analysis.suggestions.length > 0 ? (
                analysis.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{suggestion}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-sm text-success">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Your post looks great!</span>
                </div>
              )
            ) : (
              <>
                <div className="flex items-start gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${post.includes("?") ? "bg-success" : "bg-muted"}`} />
                  <span className="text-muted-foreground">Add questions to boost engagement</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${wordCount > 50 ? "bg-success" : "bg-muted"}`} />
                  <span className="text-muted-foreground">Aim for 50-150 words</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${post.includes("#") ? "bg-success" : "bg-muted"}`} />
                  <span className="text-muted-foreground">Include relevant hashtags</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Hashtag Suggestions */}
        <Card className="shadow-soft hover:shadow-elevated transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Hash className="h-4 w-4 text-accent" />
              {analysis ? 'AI-Generated Hashtags' : 'Suggested Hashtags'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(analysis?.hashtags || ["#CareerGrowth", "#Leadership", "#Innovation", "#TechTrends"]).map((tag: string) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setPost(post + (post.endsWith(' ') ? '' : ' ') + tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {analysis && (
              <p className="text-xs text-muted-foreground mt-3">
                Click any hashtag to add it to your post
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
