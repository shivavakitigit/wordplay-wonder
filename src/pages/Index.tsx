
import { GameProvider } from "@/contexts/GameContext";
import { GameHeader } from "@/components/GameHeader";
import { GameBoard } from "@/components/GameBoard";
import { Footer } from "@/components/Footer";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col">
        <BackgroundAnimation />
        <GameHeader />
        <main className="flex-1 py-8">
          <div className="container max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Advanced Sentence Construction</h1>
            <div className="flex justify-center">
              <GameBoard />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </GameProvider>
  );
};

export default Index;
