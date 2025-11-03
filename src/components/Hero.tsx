import { Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToEditor = () => {
    document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">100% Privacy-First</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Optimize Your
            </span>
            <br />
            LinkedIn Posts
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered suggestions, engagement predictions, and style improvements—all processed locally in your browser. No data ever leaves your device.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={scrollToEditor}
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Optimizing
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2"
            >
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elevated transition-shadow">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get real-time engagement predictions and style suggestions as you type
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elevated transition-shadow">
              <div className="p-3 rounded-full bg-success/10">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens locally. Your content never touches our servers
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elevated transition-shadow">
              <div className="p-3 rounded-full bg-accent/10">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Smart Suggestions</h3>
              <p className="text-sm text-muted-foreground">
                Hashtag recommendations, tone analysis, and toxicity checks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
