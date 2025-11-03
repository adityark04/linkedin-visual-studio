import { Hero } from "@/components/Hero";
import { PostEditor } from "@/components/PostEditor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary" />
            <span className="font-bold text-xl">PostOptimizer</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#editor" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Editor
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Editor Section */}
      <section id="editor" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <PostEditor />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-card">
        <div className="container mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>© 2025 LinkedIn Post Optimizer. All processing happens locally in your browser.</p>
          <p className="mt-2">Open source • Privacy-first • No data collection</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
