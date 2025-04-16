
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Timer, Brain, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type AchievementProps = {
  type: "speed" | "accuracy" | "streak" | "perfect" | "beginner";
  unlocked: boolean;
};

const ACHIEVEMENT_DATA = {
  speed: {
    icon: Timer,
    label: "Speed Demon",
    color: "bg-info text-info-foreground border-info hover:bg-info/80",
  },
  accuracy: {
    icon: Zap,
    label: "Precision Master",
    color: "bg-warning text-warning-foreground border-warning hover:bg-warning/80",
  },
  streak: {
    icon: Star,
    label: "Consistent Learner",
    color: "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80",
  },
  perfect: {
    icon: Trophy,
    label: "Perfect Score",
    color: "bg-success text-success-foreground border-success hover:bg-success/80",
  },
  beginner: {
    icon: Brain,
    label: "First Steps",
    color: "bg-accent text-accent-foreground border-accent hover:bg-accent/80",
  },
};

export function AchievementBadge({ type, unlocked }: AchievementProps) {
  const [animate, setAnimate] = useState(false);
  const achievement = ACHIEVEMENT_DATA[type];
  const Icon = achievement.icon;
  
  useEffect(() => {
    if (unlocked) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [unlocked]);
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs py-1 px-2 transition-all duration-300",
        unlocked ? achievement.color : "bg-muted/30 text-muted-foreground",
        animate && "scale-125"
      )}
    >
      <Icon className="h-3 w-3 mr-1" />
      {achievement.label}
    </Badge>
  );
}
