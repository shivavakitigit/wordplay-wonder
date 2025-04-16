import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useQuestionData } from "@/hooks/useQuestionData";

// Define types for our game data
export type WordOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Blank = {
  id: string;
  correctOptionId: string;
  selectedOptionId: string | null;
};

export type Question = {
  id: string;
  text: string;
  blanks: Blank[];
  options: WordOption[];
};

export type Language = "english" | "telugu" | "hindi" | "french" | "spanish";

// Game state interface
interface GameState {
  currentQuestionIndex: number;
  questions: Question[];
  score: number;
  timeLeft: number;
  gameStarted: boolean;
  gameFinished: boolean;
  language: Language;
  theme: "light" | "dark" | "system";
  loading: boolean;
  error: Error | null;
}

// Context interface
interface GameContextType extends GameState {
  selectOption: (blankId: string, optionId: string) => void;
  unselectOption: (blankId: string) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  startGame: () => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  areAllBlanksFilled: () => boolean;
  currentQuestion: Question | null;
}

// Create context with default values
export const GameContext = createContext<GameContextType>({
  currentQuestionIndex: 0,
  questions: [],
  score: 0,
  timeLeft: 30,
  gameStarted: false,
  gameFinished: false,
  language: "english",
  theme: "system",
  loading: true,
  error: null,
  selectOption: () => {},
  unselectOption: () => {},
  nextQuestion: () => {},
  resetGame: () => {},
  startGame: () => {},
  setLanguage: () => {},
  setTheme: () => {},
  areAllBlanksFilled: () => false,
  currentQuestion: null
});

// Telugu sample questions (transliterated)
const teluguQuestions: Question[] = [
  {
    id: "q1",
    text: "Kashtapadite kani ___ raadu.",
    blanks: [{ id: "b1", correctOptionId: "o1", selectedOptionId: null }],
    options: [
      { id: "o1", text: "vidya", isCorrect: true },
      { id: "o2", text: "dhanam", isCorrect: false },
      { id: "o3", text: "bhagyam", isCorrect: false },
      { id: "o4", text: "santosham", isCorrect: false },
    ],
  },
  {
    id: "q2",
    text: "Aapadalo ___ telusthundi.",
    blanks: [{ id: "b1", correctOptionId: "o3", selectedOptionId: null }],
    options: [
      { id: "o1", text: "dhairyam", isCorrect: false },
      { id: "o2", text: "buddhi", isCorrect: false },
      { id: "o3", text: "sneham", isCorrect: true },
      { id: "o4", text: "sabhyata", isCorrect: false },
    ],
  },
  {
    id: "q3",
    text: "Vidya vina ___ ledu.",
    blanks: [{ id: "b1", correctOptionId: "o2", selectedOptionId: null }],
    options: [
      { id: "o1", text: "santosham", isCorrect: false },
      { id: "o2", text: "viluva", isCorrect: true },
      { id: "o3", text: "dhanyata", isCorrect: false },
      { id: "o4", text: "gowravam", isCorrect: false },
    ],
  },
];

// Hindi sample questions
const hindiQuestions: Question[] = [
  {
    id: "q1",
    text: "Jaise ko ___ milta hai.",
    blanks: [{ id: "b1", correctOptionId: "o4", selectedOptionId: null }],
    options: [
      { id: "o1", text: "uska", isCorrect: false },
      { id: "o2", text: "woh", isCorrect: false },
      { id: "o3", text: "sabhi", isCorrect: false },
      { id: "o4", text: "taisa", isCorrect: true },
    ],
  },
  {
    id: "q2",
    text: "Jal bin ___ nahi hota.",
    blanks: [{ id: "b1", correctOptionId: "o1", selectedOptionId: null }],
    options: [
      { id: "o1", text: "machli", isCorrect: true },
      { id: "o2", text: "jeevan", isCorrect: false },
      { id: "o3", text: "pyaas", isCorrect: false },
      { id: "o4", text: "nadiya", isCorrect: false },
    ],
  },
  {
    id: "q3",
    text: "Der aaye ___ aaye.",
    blanks: [{ id: "b1", correctOptionId: "o3", selectedOptionId: null }],
    options: [
      { id: "o1", text: "jaldi", isCorrect: false },
      { id: "o2", text: "phir", isCorrect: false },
      { id: "o3", text: "durust", isCorrect: true },
      { id: "o4", text: "kabhi", isCorrect: false },
    ],
  },
];

// French sample questions
const frenchQuestions: Question[] = [
  {
    id: "q1",
    text: "Paris est la _______________ de la France.",
    blanks: [{ id: "b1", correctOptionId: "o1", selectedOptionId: null }],
    options: [
      { id: "o1", text: "capitale", isCorrect: true },
      { id: "o2", text: "province", isCorrect: false },
      { id: "o3", text: "rivière", isCorrect: false },
      { id: "o4", text: "montagne", isCorrect: false },
    ],
  },
  {
    id: "q2",
    text: "Je _______________ du pain à la boulangerie.",
    blanks: [{ id: "b1", correctOptionId: "o2", selectedOptionId: null }],
    options: [
      { id: "o1", text: "bois", isCorrect: false },
      { id: "o2", text: "achète", isCorrect: true },
      { id: "o3", text: "vends", isCorrect: false },
      { id: "o4", text: "cuisine", isCorrect: false },
    ],
  },
  {
    id: "q3",
    text: "Les français aiment _______________ du vin avec leur repas.",
    blanks: [{ id: "b1", correctOptionId: "o3", selectedOptionId: null }],
    options: [
      { id: "o1", text: "lancer", isCorrect: false },
      { id: "o2", text: "donner", isCorrect: false },
      { id: "o3", text: "boire", isCorrect: true },
      { id: "o4", text: "vendre", isCorrect: false },
    ],
  },
  {
    id: "q4",
    text: "La Tour Eiffel est _______________ monument français.",
    blanks: [{ id: "b1", correctOptionId: "o4", selectedOptionId: null }],
    options: [
      { id: "o1", text: "une", isCorrect: false },
      { id: "o2", text: "le", isCorrect: false },
      { id: "o3", text: "des", isCorrect: false },
      { id: "o4", text: "un", isCorrect: true },
    ],
  },
];

// Spanish sample questions
const spanishQuestions: Question[] = [
  {
    id: "q1",
    text: "Barcelona es una _______________ en España.",
    blanks: [{ id: "b1", correctOptionId: "o2", selectedOptionId: null }],
    options: [
      { id: "o1", text: "país", isCorrect: false },
      { id: "o2", text: "ciudad", isCorrect: true },
      { id: "o3", text: "océano", isCorrect: false },
      { id: "o4", text: "montaña", isCorrect: false },
    ],
  },
  {
    id: "q2",
    text: "Me gusta _______________ al fútbol con mis amigos.",
    blanks: [{ id: "b1", correctOptionId: "o3", selectedOptionId: null }],
    options: [
      { id: "o1", text: "comer", isCorrect: false },
      { id: "o2", text: "bailar", isCorrect: false },
      { id: "o3", text: "jugar", isCorrect: true },
      { id: "o4", text: "cantar", isCorrect: false },
    ],
  },
  {
    id: "q3",
    text: "¿_______________ qué hora es?",
    blanks: [{ id: "b1", correctOptionId: "o1", selectedOptionId: null }],
    options: [
      { id: "o1", text: "Sabes", isCorrect: true },
      { id: "o2", text: "Tienes", isCorrect: false },
      { id: "o3", text: "Quieres", isCorrect: false },
      { id: "o4", text: "Puedes", isCorrect: false },
    ],
  },
  {
    id: "q4",
    text: "Vamos a _______________ una película esta noche.",
    blanks: [{ id: "b1", correctOptionId: "o2", selectedOptionId: null }],
    options: [
      { id: "o1", text: "cocinar", isCorrect: false },
      { id: "o2", text: "ver", isCorrect: true },
      { id: "o3", text: "escribir", isCorrect: false },
      { id: "o4", text: "comprar", isCorrect: false },
    ],
  },
];

// Game provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Sound effects hook
  const { playSound } = useSoundEffects();
  
  // Get question data from JSON file
  const { questions: englishQuestions, loading: dataLoading, error: dataError } = useQuestionData();
  
  // Get system theme preference
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Initial state
  const [state, setState] = useState<GameState>({
    currentQuestionIndex: 0,
    questions: [],
    score: 0,
    timeLeft: 30,
    gameStarted: false,
    gameFinished: false,
    language: "english",
    theme: "system",
    loading: true,
    error: null
  });

  // Update state when questions are loaded
  useEffect(() => {
    if (!dataLoading) {
      setState(prev => ({ 
        ...prev, 
        questions: englishQuestions,
        loading: dataLoading,
        error: dataError
      }));
    }
  }, [englishQuestions, dataLoading, dataError]);

  // Apply theme
  useEffect(() => {
    const applyTheme = () => {
      const theme = state.theme === "system" ? getSystemTheme() : state.theme;
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme();

    // Listen for system theme changes if using system theme
    if (state.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [state.theme]);

  // Timer effect
  useEffect(() => {
    let timerId: number | undefined;

    if (state.gameStarted && !state.gameFinished && state.timeLeft > 0) {
      timerId = window.setInterval(() => {
        setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (state.timeLeft === 0 && !state.gameFinished) {
      // Auto-proceed to next question or end game
      if (state.currentQuestionIndex < state.questions.length - 1) {
        setState((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          timeLeft: 30,
        }));
      } else {
        // Calculate score before finishing
        let correctAnswers = 0;
        state.questions.forEach((question) => {
          question.blanks.forEach((blank) => {
            if (blank.selectedOptionId === blank.correctOptionId) {
              correctAnswers += 1;
            }
          });
        });

        setState((prev) => ({ 
          ...prev, 
          gameFinished: true,
          score: correctAnswers
        }));
      }
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [state.gameStarted, state.gameFinished, state.timeLeft, state.currentQuestionIndex, state.questions.length]);

  // Get current question
  const currentQuestion = state.currentQuestionIndex < state.questions.length
    ? state.questions[state.currentQuestionIndex]
    : null;

  // Check if all blanks are filled
  const areAllBlanksFilled = () => {
    if (!currentQuestion) return false;
    return currentQuestion.blanks.every((blank) => blank.selectedOptionId !== null);
  };

  // Select an option for a blank
  const selectOption = (blankId: string, optionId: string) => {
    if (!currentQuestion || state.gameFinished) return;

    // Play click sound
    playSound("click");

    setState((prev) => {
      const updatedQuestions = [...prev.questions];
      const questionIndex = prev.currentQuestionIndex;
      const blankIndex = updatedQuestions[questionIndex].blanks.findIndex(
        (b) => b.id === blankId
      );

      if (blankIndex !== -1) {
        updatedQuestions[questionIndex].blanks[blankIndex].selectedOptionId = optionId;
      }

      return { ...prev, questions: updatedQuestions };
    });
  };

  // Unselect an option
  const unselectOption = (blankId: string) => {
    if (!currentQuestion || state.gameFinished) return;

    setState((prev) => {
      const updatedQuestions = [...prev.questions];
      const questionIndex = prev.currentQuestionIndex;
      const blankIndex = updatedQuestions[questionIndex].blanks.findIndex(
        (b) => b.id === blankId
      );

      if (blankIndex !== -1) {
        updatedQuestions[questionIndex].blanks[blankIndex].selectedOptionId = null;
      }

      return { ...prev, questions: updatedQuestions };
    });
  };

  // Move to next question
  const nextQuestion = () => {
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      // Calculate final score before finishing
      let correctAnswers = 0;
      state.questions.forEach((question) => {
        question.blanks.forEach((blank) => {
          if (blank.selectedOptionId === blank.correctOptionId) {
            correctAnswers += 1;
          }
        });
      });

      // Play completion sound
      playSound("complete");

      setState((prev) => ({
        ...prev,
        gameFinished: true,
        score: correctAnswers,
      }));
    } else {
      // Update score for current question
      let correctAnswers = 0;
      currentQuestion?.blanks.forEach((blank) => {
        if (blank.selectedOptionId === blank.correctOptionId) {
          correctAnswers += 1;
          playSound("correct");
        } else if (blank.selectedOptionId) {
          playSound("incorrect");
        }
      });

      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeLeft: 30,
        score: prev.score + correctAnswers,
      }));
    }
  };

  // Reset game
  const resetGame = () => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: 0,
      score: 0,
      timeLeft: 30,
      gameStarted: false,
      gameFinished: false,
    }));
  };

  // Start game
  const startGame = () => {
    setState((prev) => ({
      ...prev,
      gameStarted: true,
      gameFinished: false,
      currentQuestionIndex: 0,
      score: 0,
      timeLeft: 30,
    }));
  };

  // Set language
  const setLanguage = (language: Language) => {
    let questions;
    switch (language) {
      case "telugu":
        questions = teluguQuestions;
        break;
      case "hindi":
        questions = hindiQuestions;
        break;
      case "french":
        questions = frenchQuestions;
        break;
      case "spanish":
        questions = spanishQuestions;
        break;
      default:
        questions = englishQuestions;
    }

    setState((prev) => ({
      ...prev,
      language,
      questions,
      currentQuestionIndex: 0,
      gameStarted: false,
      gameFinished: false,
      score: 0,
      timeLeft: 30,
    }));
  };

  // Set theme
  const setTheme = (theme: "light" | "dark" | "system") => {
    setState((prev) => ({ ...prev, theme }));
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        selectOption,
        unselectOption,
        nextQuestion,
        resetGame,
        startGame,
        setLanguage,
        setTheme,
        areAllBlanksFilled,
        currentQuestion,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
