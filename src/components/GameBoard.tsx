
import { useGame } from "@/contexts/GameContext";
import { SentenceDisplay } from "./SentenceDisplay";
import { WordOptions } from "./WordOptions";
import { Timer } from "./Timer";
import { GameControls } from "./GameControls";
import { Card, CardContent } from "@/components/ui/card";
import { GameStats } from "./GameStats";
import { Achievements } from "./Achievements";
import { AnimatedContainer } from "./AnimatedContainer";
import { Loader2 } from "lucide-react";

export function GameBoard() {
  const { gameStarted, gameFinished, loading, error } = useGame();
  
  // Loading state
  if (loading) {
    return (
      <AnimatedContainer animation="scale" className="w-full max-w-xl">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg">Loading questions...</p>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    );
  }
  
  // Error state
  if (error) {
    return (
      <AnimatedContainer animation="scale" className="w-full max-w-xl">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <h2 className="text-2xl font-bold mb-4 text-destructive">Error Loading Questions</h2>
              <p className="mb-4">{error.message}</p>
              <p>Please refresh the page or try again later.</p>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    );
  }
  
  // Welcome screen
  if (!gameStarted && !gameFinished) {
    return (
      <AnimatedContainer animation="scale" className="w-full max-w-xl">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <AnimatedContainer animation="fade" delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">Welcome to WordPlay Wonder!</h2>
            </AnimatedContainer>
            <AnimatedContainer animation="fade" delay={0.4}>
              <p className="mb-6">
                Challenge yourself to complete sentences by selecting the correct word from the options.
                You have 30 seconds per question. Ready to test your language skills?
              </p>
            </AnimatedContainer>
            <AnimatedContainer animation="bounce" delay={0.6}>
              <GameControls />
            </AnimatedContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>
    );
  }
  
  // Results screen
  if (gameFinished) {
    return (
      <AnimatedContainer animation="scale" className="w-full max-w-xl">
        <Card className="glass-card mb-8">
          <CardContent className="p-6 text-center">
            <AnimatedContainer animation="fade" delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">Game Complete!</h2>
              <p className="mb-4">
                Great job! You've completed all the questions. Here's how you did:
              </p>
            </AnimatedContainer>
            <AnimatedContainer animation="slide" delay={0.4}>
              <GameStats />
            </AnimatedContainer>
            <AnimatedContainer animation="slide" delay={0.6}>
              <Achievements />
            </AnimatedContainer>
            <AnimatedContainer animation="fade" delay={0.8}>
              <div className="mt-6">
                <GameControls />
              </div>
            </AnimatedContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>
    );
  }
  
  // Game in progress
  return (
    <AnimatedContainer animation="scale" className="w-full max-w-xl">
      <Card className="glass-card mb-8">
        <CardContent className="p-6">
          <AnimatedContainer animation="slide" delay={0.1}>
            <Timer />
          </AnimatedContainer>
          <AnimatedContainer animation="fade" delay={0.2}>
            <SentenceDisplay />
          </AnimatedContainer>
          <AnimatedContainer animation="slide" delay={0.3}>
            <WordOptions />
          </AnimatedContainer>
          <AnimatedContainer animation="fade" delay={0.4}>
            <div className="flex justify-center">
              <GameControls />
            </div>
          </AnimatedContainer>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}
