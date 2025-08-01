import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay before hiding
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Realistic loading progression
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-pulse" />
      
      {/* Main loader container */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Spinning rings */}
        <div className="relative w-24 h-24">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin" 
               style={{ animationDuration: '3s' }} />
          
          {/* Middle ring */}
          <div className="absolute inset-2 border-3 border-accent/40 rounded-full animate-spin" 
               style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          
          {/* Inner ring */}
          <div className="absolute inset-4 border-2 border-primary rounded-full animate-spin" 
               style={{ animationDuration: '1.5s' }} />
          
          {/* Center dot */}
          <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-accent rounded-full animate-pulse" />
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground animate-pulse">
            Loading Portfolio
          </h2>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-muted-foreground text-sm">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/60 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;