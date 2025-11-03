import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Hash, CheckCircle2 } from "lucide-react";

export const PostEditor = () => {
  const [post, setPost] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 1500);
  };

  const engagementScore = Math.min(95, Math.max(45, post.length / 3 + Math.random() * 20));
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
            <div className="text-sm text-muted-foreground">
              {wordCount} words · {post.length} characters
            </div>
            <Button 
              onClick={handleAnalyze}
              disabled={!post.trim() || analyzing}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {analyzing ? "Analyzing..." : "Optimize Post"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Insights Panel */}
      <div className="space-y-6 animate-slide-up">
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
              {post.length > 0 ? Math.round(engagementScore) : "--"}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {post.length === 0 
                ? "Start writing to see predictions"
                : engagementScore > 70 
                ? "Excellent potential!" 
                : "Try adding more details"}
            </p>
          </CardContent>
        </Card>

        {/* Style Suggestions */}
        <Card className="shadow-soft hover:shadow-elevated transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Style Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
          </CardContent>
        </Card>

        {/* Hashtag Suggestions */}
        <Card className="shadow-soft hover:shadow-elevated transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Hash className="h-4 w-4 text-accent" />
              Suggested Hashtags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["#CareerGrowth", "#Leadership", "#Innovation", "#TechTrends"].map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setPost(post + " " + tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
