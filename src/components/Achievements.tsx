
import { useGame } from "@/contexts/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AchievementBadge } from "./AchievementBadge";
import { Award } from "lucide-react";

export function Achievements() {
  const { score, questions, timeLeft } = useGame();
  
  // Calculate achievements
  const isPerfectScore = score === questions.length;
  const hasSpeedAchievement = timeLeft > 10; // Completed with more than 10 seconds left
  const hasAccuracyAchievement = score >= questions.length * 0.8; // At least 80% correct
  const hasBeginnerAchievement = true; // Always unlocked
  const hasStreakAchievement = score >= 3; // At least 3 correct in a row
  
  return (
    <Card className="glass-card w-full mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <AchievementBadge type="perfect" unlocked={isPerfectScore} />
          <AchievementBadge type="speed" unlocked={hasSpeedAchievement} />
          <AchievementBadge type="accuracy" unlocked={hasAccuracyAchievement} />
          <AchievementBadge type="streak" unlocked={hasStreakAchievement} />
          <AchievementBadge type="beginner" unlocked={hasBeginnerAchievement} />
        </div>
      </CardContent>
    </Card>
  );
}
