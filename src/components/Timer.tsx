
import { useGame } from "@/contexts/GameContext";
import { Progress } from "@/components/ui/progress";
import { Timer as TimerIcon } from "lucide-react";

export function Timer() {
  const { timeLeft } = useGame();
  
  // Calculate percentage for progress bar
  const percentage = (timeLeft / 30) * 100;
  
  // Determine color based on time remaining
  const getColor = () => {
    if (timeLeft > 20) return "bg-success";
    if (timeLeft > 10) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TimerIcon className="h-4 w-4" />
          <span className="font-medium">Time Remaining</span>
        </div>
        <span className="font-bold">{timeLeft}s</span>
      </div>
      <Progress value={percentage} className="h-2">
        <div 
          className={`h-full ${getColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${percentage}%` }}
        />
      </Progress>
    </div>
  );
}
