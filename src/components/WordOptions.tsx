
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function WordOptions() {
  const { currentQuestion, selectOption, gameFinished } = useGame();
  const [activeBlankIndex, setActiveBlankIndex] = useState(0);
  
  if (!currentQuestion) return null;
  
  // Handle multiple blanks
  const blanks = currentQuestion.blanks;
  const activeBlank = blanks[activeBlankIndex];
  
  // Change the active blank
  const handleBlankChange = (index: number) => {
    setActiveBlankIndex(index);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Blank selector */}
      {blanks.length > 1 && (
        <div className="flex justify-center mb-4 gap-2">
          {blanks.map((blank, index) => (
            <Button
              key={blank.id}
              variant={activeBlankIndex === index ? "default" : "outline"}
              size="sm"
              onClick={() => handleBlankChange(index)}
              className={cn(
                "rounded-full w-8 h-8 p-0",
                blank.selectedOptionId ? "border-primary" : ""
              )}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
      
      {/* Word options */}
      <div className="grid grid-cols-2 gap-3 my-6 w-full">
        {currentQuestion.options.map((option) => {
          // Check if this option is already selected for any blank
          const isSelectedForAnyBlank = blanks.some(
            (b) => b.selectedOptionId === option.id
          );
          
          // When game is finished, highlight correct and incorrect answers
          let statusClass = "";
          if (gameFinished) {
            if (option.id === activeBlank.correctOptionId) {
              statusClass = "bg-success text-success-foreground border-success";
            } else if (option.id === activeBlank.selectedOptionId && option.id !== activeBlank.correctOptionId) {
              statusClass = "bg-destructive text-destructive-foreground border-destructive";
            }
          }
          
          return (
            <Button
              key={option.id}
              onClick={() => !gameFinished && !isSelectedForAnyBlank && selectOption(activeBlank.id, option.id)}
              variant={activeBlank.selectedOptionId === option.id ? "default" : "outline"}
              size="lg"
              className={cn(
                "h-16 text-lg hover-scale transition-all",
                activeBlank.selectedOptionId === option.id && !gameFinished ? "bg-primary text-primary-foreground" : "",
                statusClass,
                gameFinished ? "cursor-default" : "",
                option.id === activeBlank.selectedOptionId ? "ring-2 ring-primary" : "",
                isSelectedForAnyBlank && option.id !== activeBlank.selectedOptionId ? "opacity-50" : ""
              )}
              disabled={gameFinished || isSelectedForAnyBlank}
            >
              {option.text}
            </Button>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        {activeBlankIndex + 1} of {blanks.length}
      </div>
    </div>
  );
}
