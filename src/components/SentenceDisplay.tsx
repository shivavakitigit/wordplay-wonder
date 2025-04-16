
import React from "react";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";

// Blank component
function Blank({ 
  blankId, 
  selectedOption,
  blankIndex 
}: { 
  blankId: string, 
  selectedOption: any,
  blankIndex: number 
}) {
  const { gameFinished, unselectOption, currentQuestion } = useGame();
  
  const handleClick = () => {
    if (selectedOption && !gameFinished) {
      unselectOption(blankId);
    }
  };
  
  // When game is finished, we show if answer was correct
  let statusClass = "";
  if (gameFinished && selectedOption && currentQuestion) {
    const correctOptionId = currentQuestion.blanks.find(b => b.id === blankId)?.correctOptionId;
    statusClass = selectedOption.id === correctOptionId ? "bg-success/20 border-success" : "bg-destructive/20 border-destructive";
  }
  
  return (
    <span
      onClick={handleClick}
      className={cn(
        "mx-1 px-2 py-1 min-w-[80px] inline-block text-center rounded border-2 border-dashed transition-all",
        selectedOption
          ? "border-solid cursor-pointer hover:bg-muted/50 " + statusClass
          : "border-border animate-pulse-subtle",
        gameFinished && !selectedOption ? "bg-destructive/20 border-destructive" : ""
      )}
    >
      {selectedOption ? selectedOption.text : `(${blankIndex+1})`}
    </span>
  );
}

export function SentenceDisplay() {
  const { currentQuestion, gameFinished } = useGame();
  
  if (!currentQuestion) return null;
  
  // Helper function to split sentence text with blanks
  function parseSentence(text: string, blanks: any[]) {
    // Find the blank placeholder
    const parts = text.split("_____________");
    
    if (parts.length === 1) return <>{text}</>;
    
    return (
      <>
        {parts.map((part, index) => {
          // After the last part, no blank
          if (index === parts.length - 1) {
            return <span key={`part-${index}`}>{part}</span>;
          }
          
          // Display part followed by a blank or selected word
          const blank = blanks[index];
          const selectedOption = blank.selectedOptionId 
            ? currentQuestion.options.find(o => o.id === blank.selectedOptionId)
            : null;
          
          return (
            <React.Fragment key={`fragment-${index}`}>
              <span key={`part-${index}`}>{part}</span>
              <Blank 
                key={`blank-${blank.id}`} 
                blankId={blank.id} 
                selectedOption={selectedOption}
                blankIndex={index}
              />
            </React.Fragment>
          );
        })}
      </>
    );
  }
  
  return (
    <div className="text-xl md:text-2xl font-medium text-center my-8 leading-relaxed">
      {parseSentence(currentQuestion.text, currentQuestion.blanks)}
      
      {/* Show correct answers when game is finished and answers were wrong */}
      {gameFinished && currentQuestion.blanks.map((blank, index) => {
        const selectedOptionId = blank.selectedOptionId;
        const correctOptionId = blank.correctOptionId;
        
        if (selectedOptionId !== correctOptionId) {
          const correctOption = currentQuestion.options.find(o => o.id === correctOptionId);
          return (
            <div key={`correct-${blank.id}`} className="text-sm mt-2 text-success">
              Blank {index+1}: <span className="font-bold">{correctOption?.text}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
