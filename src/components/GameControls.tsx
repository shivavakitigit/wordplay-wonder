
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, PlayCircle } from "lucide-react";

export function GameControls() {
  const { 
    gameStarted, 
    gameFinished, 
    nextQuestion, 
    resetGame, 
    startGame, 
    areAllBlanksFilled, 
    currentQuestionIndex, 
    questions 
  } = useGame();
  
  // Game hasn't started yet
  if (!gameStarted) {
    return (
      <Button 
        onClick={startGame} 
        size="lg" 
        className="mt-4 px-8 animate-bounce-light"
      >
        <PlayCircle className="mr-2 h-5 w-5" /> Start Game
      </Button>
    );
  }
  
  // Game finished, show results and restart button
  if (gameFinished) {
    return (
      <Button 
        onClick={resetGame} 
        size="lg" 
        variant="outline" 
        className="mt-4 px-8"
      >
        <RefreshCw className="mr-2 h-4 w-4" /> Play Again
      </Button>
    );
  }
  
  // Show next button (disabled if blanks not filled)
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  return (
    <Button 
      onClick={nextQuestion} 
      size="lg" 
      disabled={!areAllBlanksFilled()} 
      className="mt-4 px-8"
    >
      {isLastQuestion ? "Finish" : "Next"}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
