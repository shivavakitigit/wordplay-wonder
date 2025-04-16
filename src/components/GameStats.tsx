
import { useGame } from "@/contexts/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Timer, Star, Check, X } from "lucide-react";

export function GameStats() {
  const { score, questions, timeLeft } = useGame();
  
  const totalQuestions = questions.length;
  const totalBlanks = questions.reduce((count, question) => count + question.blanks.length, 0);
  const scorePercentage = (score / totalBlanks) * 100;
  
  // Calculate speed bonus based on remaining time
  const speedBonus = Math.floor((timeLeft / 30) * 10);
  
  // Simple IQ level calculation (just for fun)
  const calculateIQ = () => {
    const baseIQ = 100;
    const scoreContribution = (score / totalBlanks) * 40;
    const speedContribution = speedBonus * 2;
    return Math.floor(baseIQ + scoreContribution + speedContribution);
  };
  
  const iqLevel = calculateIQ();
  
  // Get IQ level description
  const getIQDescription = () => {
    if (iqLevel >= 130) return "Exceptional";
    if (iqLevel >= 120) return "Superior";
    if (iqLevel >= 110) return "Above Average";
    if (iqLevel >= 90) return "Average";
    if (iqLevel >= 80) return "Below Average";
    return "Developing";
  };
  
  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl">
            <Trophy className="h-5 w-5 mr-2 text-warning" />
            Your Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Final Score</span>
                <span className="font-bold">{score}/{totalBlanks}</span>
              </div>
              <Progress value={scorePercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-success" />
                  <span>Correct</span>
                </div>
                <span className="font-bold">{score}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-destructive" />
                  <span>Incorrect</span>
                </div>
                <span className="font-bold">{totalBlanks - score}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-2 text-info" />
                <span>Speed Bonus</span>
              </div>
              <span className="font-bold">+{speedBonus} pts</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-accent" />
                <span>IQ Level</span>
              </div>
              <div className="text-right">
                <div className="font-bold">{iqLevel}</div>
                <div className="text-xs text-muted-foreground">{getIQDescription()}</div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Total Questions: {totalQuestions} | Total Answer Blanks: {totalBlanks}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
